import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { http } from "../../api/axios"
import { chainId, MUNGContract } from "../../utils/Web3Config"
import Web3 from "web3"

// Nickname을 전역변수로 넣기 위한 import문
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"

export default function Login() {
  const [, setNickname] = useRecoilState(memberAtom)
  const [isNew, setIsNew] = useState(false)

  const navigate = useNavigate()
  let web3: any

  const handleAuthenticate = ({
    publicAddress,
    signature,
  }: {
    publicAddress: string
    signature: string
  }) => {
    const data = { address: publicAddress, signature: signature }
    http.post(`auth/signature`, data).then((res) => {
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

  // 회원가입
  const handleSignin = async (publicAddress: string) => {
    await http
      .post(`auth/signin`, { address: publicAddress })
      .then((res) => res.data.nonce)
      .catch((err) => console.error("에러", err))
  }

  // SSAFY 네트워크 연결 함수
  const handleEthereumNetwork = async (chainId: number) => {
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

    await localStorage.setItem("publicAddress", publicAddress)
    let nonce: any

    console.log(1, isNew)
    // Look if user with current publicAddress is already present on backend
    await http
      .get(`auth/info/${publicAddress}`)
      .then(async (res) => {
        nonce = await res.data.nonce
        await setIsNew(false)
        console.log(2, isNew)
      })
      .catch(async () => {
        nonce = await handleSignin(publicAddress)
        console.log(3, isNew, nonce)
        await setIsNew(true)
        console.log(4, isNew)
      })

    // Popup MetaMask confirmation modal to sign message
    const third = await handleSignMessage({ publicAddress, nonce })

    // Send signature to backend on the /auth route
    await handleAuthenticate(third)

    // SSAFY Network 연결
    try {
      await handleEthereumNetwork(chainId)
      console.log(5, isNew)
      // 최초가입시 10000 MUNG 지급
      if (isNew === true) {
        console.log(6, isNew)
        window.alert("최초가입하셨네요! 만원을 지급해드립니다!")
        MUNGContract.methods
          .mintToMember(publicAddress, 10000)
          .send({ from: publicAddress })
      }
      console.log(7, isNew)

      // 회원 닉네임 전역변수에 저장
      await http
        .get(`auth/info/nickname/${publicAddress}`)
        .then((res) => {
          // walletAddress, memberNickname recoil 전역변수에 저장
          setNickname((prev) => {
            const value = { ...prev }
            value.memberNickname = res.data.nickname
            value.walletAddress = publicAddress
            return value
          })
        })
        .catch((err) => console.error("닉네임 에러", err))

      // Spinner 넣기

      navigate("/mainpage")
    } catch (err) {
      console.log("싸피네트워크가 등록되어 있지 않습니다.")
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
