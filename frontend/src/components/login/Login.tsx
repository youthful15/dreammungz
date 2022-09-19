import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { chainId } from "../../utils/web3"
import Web3 from "web3"
export default function Login() {
  const navigate = useNavigate()
  let web3: any

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

  // 네트워크 연결 함수
  const handleNetwork = async (chainId: number) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(chainId) }],
    })
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

    // localStorage에 지갑 주소 저장
    localStorage.setItem("publicAddress", publicAddress)
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
    await handleAuthenticate(third)

    const accounts = await window.ethereum.request({ method: "eth_accounts" })
    await handleNetwork(chainId)

    navigate("/mainpage")
    // Pass accessToken back to parent component (to save it in localStorage)
    try {
    } catch (err) {
      window.alert(err)
    }
  }

  return (
    <div>
      <button
        className="Login-button Login-mm flex items-center border bg-[#273850] p-2"
        onClick={handleClick}
      >
        <img
          src="images/metamask.png"
          className="mr-1"
          alt="Metamask 로그인 이미지"
        />
        <p className="font-semibold text-white">MetaMask 로그인</p>
      </button>
    </div>
  )
}
