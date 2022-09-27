import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { http } from "../../api/axios"
import { chainId, MUNGContract } from "../../utils/Web3Config"
import Web3 from "web3"

// Nickname을 전역변수로 넣기 위한 import문
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"

export default function Login() {
  const [, setMember] = useRecoilState(memberAtom)

  const navigate = useNavigate()
  let web3: any

  // Functions
  const handleAuthenticate = async ({
    publicAddress,
    signature,
  }: {
    publicAddress: string
    signature: string
  }) => {
    await http
      .post(`auth/signature`, {
        address: publicAddress,
        signature: signature,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("expiration", res.data.expiration)
      })
      .catch((err) => console.error("handleAuthentiacte ERROR", err))
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
  // 회원가입
  const handleSignin = (publicAddress: string) => {
    return http
      .post(`auth/signin`, { address: publicAddress })
      .then((res) => res.data.nonce)
      .catch((err) => console.error("에러", err))
  }
  // SSAFY 네트워크 연결 함수
  const handleEthereumNetwork = async (chainId: number) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3?.utils.toHex(chainId) }],
    })
  }
  // 회원 닉네임 저장 함수
  const saveNickname = async ({ publicAddress }: { publicAddress: string }) => {
    await http
      .get(`auth/info/nickname/${publicAddress}`)
      .then((res) => {
        // walletAddress, memberNickname recoil 전역변수에 저장
        setMember((prev) => {
          const value = { ...prev }
          value.memberNickname = res.data.nickname
          value.walletAddress = publicAddress
          return value
        })
      })
      .catch((err) => console.error("닉네임 에러", err))
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

    const publicAddress = await coinbase.toLowerCase()
    localStorage.setItem("publicAddress", publicAddress)

    // 지갑주소 Recoil 변수 저장
    await setMember((prev) => {
      const value = { ...prev }
      value.walletAddress = publicAddress
      return value
    })
    let nonce: any
    let isNew: any
    // Look if user with current publicAddress is already present on backend
    await http
      .get(`auth/info/${publicAddress}`)
      .then((res) => {
        nonce = res.data.nonce
        isNew = false
      })
      .catch(() => {
        async function handleSigninFunction() {
          nonce = await handleSignin(publicAddress)
        }
        handleSigninFunction()
        isNew = true
      })

    // Popup MetaMask confirmation modal to sign message
    const auth: any = await handleSignMessage({ publicAddress, nonce })

    // Send signature to backend on the /auth route
    await handleAuthenticate(auth)

    // SSAFY Network 연결
    try {
      await handleEthereumNetwork(chainId)

      // 최초 가입 시 10000 M 지급
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      // isNew === true 로 바꿔야 함
      if (isNew !== true) {
        window.alert("최초가입하셨네요! 만원을 지급해드립니다!")

        try {
          await MUNGContract.methods
            .mintToMember(publicAddress, 100)
            .send({ from: publicAddress })
        } catch {
          window.alert("돈을 거부하다니..")
          window.location.replace("/mainpage")
        }
      }

      // 회원 닉네임 전역변수에 저장
      await saveNickname({ publicAddress })

      // Spinner 넣기

      navigate("/mainpage")
    } catch (err) {
      alert("싸피네트워크가 등록되어 있지 않습니다!")
    }
  }

  return (
    <div
      className="Login-button Login-mm flex items-center border bg-[#273850] p-2"
      onClick={handleClick}
    >
      <img
        src="images/metamask.png"
        className="mr-1"
        alt="Metamask 로그인 이미지"
      />
      <p className="font-semibold text-white">MetaMask 로그인</p>
    </div>
  )
}
