import React, { useState } from "react"
import axios from "axios"
import Web3 from "web3"

export default function Login() {
  let web3: any

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
      const signature = await web3!.eth.personal.sign(nonce, publicAddress, "")
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
    if (!window.ethereum) {
      window.alert("Please install MetaMask first.")
      return
    }
    if (!web3) {
      try {
        // Request account access if needed
        await window.ethereum.enable()

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3(window.ethereum)
      } catch (error) {
        window.alert("You need to allow MetaMask.")
        return
      }
    }

    const coinbase = await web3.eth.getCoinbase()
    if (!coinbase) {
      window.alert("Please activate MetaMask first.")
      return
    }

    const publicAddress = coinbase.toLowerCase()
    setLoading(true)

    let nonce

    // Look if user with current publicAddress is already present on backend
    const first = await axios({
      method: "GET",
      url: `http://localhost:8081/auth/info/${publicAddress}`,
    })
      .then((res: any) => res.data.nonce)
      .catch((err: any) => err.response.data.message)

    // 존재하면 exception의 에러메시지
    if (first !== "존재하지 않는 회원입니다.") {
      nonce = first
    } else {
      nonce = await handleSignup(publicAddress)
    }

    // Popup MetaMask confirmation modal to sign message
    const third = await handleSignMessage({ publicAddress, nonce })

    // Send signature to backend on the /auth route
    const forth = await handleAuthenticate(third)

    // Pass accessToken back to parent component (to save it in localStorage)
    try {
    } catch (err) {
      window.alert(err)
      setLoading(false)
    }
  }

  return (
    <div>
      <button className="Login-button Login-mm" onClick={handleClick}>
        {loading ? "Loading..." : "Login with MetaMask"}
      </button>
    </div>
  )
}
