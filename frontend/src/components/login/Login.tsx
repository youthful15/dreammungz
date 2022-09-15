import React, { useState } from "react"
import axios from "axios"
import Web3 from "web3"

export default function Login() {
  const currentProvider = new Web3.providers.HttpProvider(
    "http://localhost:8081"
  )
  let web3 = new Web3(currentProvider)

  const [loading, setLoading] = useState(false)

  const handleAuthenticate = ({
    publicAddress,
    signature,
  }: {
    publicAddress: string
    signature: string
  }) => {
    axios({
      method: "POST",
      url: `http://localhost:8081/auth/signature`,
      data: {
        address: publicAddress,
        signature: signature,
      },
    }).then((res: any) => {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("expiration", res.data.expiration)
    })
  }

  const handleSignMessage = async ({
    publicAddress,
    nonce,
  }: {
    publicAddress: string
    nonce: string
  }) => {
    try {
      const signature = await web3!.eth.personal.sign(
        `${nonce}`,
        publicAddress,
        ""
      )
      return { publicAddress, signature }
    } catch (err: any) {
      throw new Error("You need to sign the message to be able to log in.")
    }
  }

  const handleSignup = (publicAddress: string) => {
    axios({
      method: "POST",
      url: `http://localhost:8081/auth/signin`,
      params: {
        address: publicAddress,
      },
    }).then((res: any) => res.data.nonce)
  }

  const handleClick = async () => {
    // Check if MetaMask is installed
    if (!(window as any).ethereum) {
      window.alert("Please install MetaMask first.")
      return
    }

    if (!web3) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable()
        console.log("111111111111111")

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3((window as any).ethereum)
        console.log("222222222222222")
      } catch (error) {
        window.alert("You need to allow MetaMask.")
        return
      }
    }

    const coinbase = await web3.eth.getCoinbase()
    console.log("33333333333333333333")
    if (!coinbase) {
      window.alert("Please activate MetaMask first.")
      return
    }

    const publicAddress = coinbase.toLowerCase()
    setLoading(true)
    console.log("444444444444444444444")

    let nonce

    // Look if user with current publicAddress is already present on backend
    const first = await axios({
      method: "GET",
      url: `http://localhost:8081/auth/info/${publicAddress}`,
    })
      .then((res: any) => res.data.nonce)
      .catch((err: any) => err.response.data.message)
    console.log("55555555555555555555555")

    // 존재하면 exception의 에러메시지
    if (first !== "존재하지 않는 회원입니다.") {
      nonce = first
    } else {
      nonce = await handleSignup(publicAddress)
    }
    console.log("6666666666666666666")

    // Popup MetaMask confirmation modal to sign message
    const third = await handleSignMessage({ publicAddress, nonce })

    console.log("77777777777777777777")

    // Send signature to backend on the /auth route
    const forth = await handleAuthenticate(third)

    console.log("888888888888888888888888")

    // Pass accessToken back to parent component (to save it in localStorage)
    try {
    } catch (err) {
      window.alert(err)
      setLoading(false)
    }
  }

  return (
    <div>
      <p>
        Please select your login method.
        <br />
        For the purpose of this demo, only MetaMask login is implemented.
      </p>
      <button className="Login-button Login-mm" onClick={handleClick}>
        {loading ? "Loading..." : "Login with MetaMask"}
      </button>
    </div>
  )
}
