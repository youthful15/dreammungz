import html2canvas from "html2canvas"
import { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { create } from "ipfs-http-client"
import { MFTContract } from "../utils/Web3Config"
import { http } from "../api/axios"
// Nickname을 전역변수로 넣기 위한 import문
import memberAtom from "../recoil/member/atom"
import tradeAtom from "../recoil/trade/atom"
import { useRecoilState } from "recoil"
import SpinnerModal from "../components/modal/SpinnerModal"
import Spinner from "../components/spinner/Spinner"

export default function GameEnding() {
  const [NFT, setNFT] = useState({
    color: "PINK",
    hair: "CURLY",
    face: "BEAN",
    tier: "NORMAL",
    job: "",
    status: [
      {
        name: "QUICK",
        value: 3,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
    gender: "M",
  })

  useEffect(() => {
    async function GetStory() {
      await http
        .get(`nft/result/address/${localStorage.getItem("publicAddress")}`)
        .then((res) => {
          setNFT(res.data)
          console.log(res.data)
        })
    }
    GetStory()
  }, [])

  const navigate = useNavigate()
  const publicAddress = localStorage.getItem("publicAddress")
  const [member] = useRecoilState(memberAtom)
  const [trade, setTrade] = useRecoilState(tradeAtom)
  const canvasRef = useRef(null)
  const client = create({
    url: "https://j7a605.p.ssafy.io/ipfs/",
  })

  const copyDOM = async () => {
    window.scrollTo(0, 0)

    setTrade((prev) => {
      const variable = { ...prev }
      variable.modalOpen6 = true
      return { ...variable }
    })

    let url = ""
    await html2canvas(canvasRef.current!).then(async (canvas) => {
      url = canvas.toDataURL("image/jpg")
      let arr = url.split(",")
      let mime = arr[0].match(/:(.*?);/)![1]
      let bstr = window.atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      // 난수 생성 코드
      const file = new File([u8arr], `munggae.png`, { type: mime })
      const hash = await client.add(file)
      const imageURL = "https://ipfs.io/ipfs/" + hash.path

      // 이미지 URL
      console.log("이미지 URL", imageURL)
      Object.assign(NFT, { url: imageURL })

      // 중요!
      // NFT 별 MetaData를 다르게 하기 위한 코드 2줄
      const nansu = new Date().getTime() + Math.random()
      Object.assign(NFT, { nansu: nansu })
      const newHash = await client.add(JSON.stringify(NFT))

      // NFT Token ID
      let nftTokenId
      const metadata = "https://ipfs.io/ipfs/" + newHash.path
      console.log("메타데이터", metadata)
      const metadataURI = { metadata: metadata }
      Object.assign(NFT, { id: nftTokenId })
      Object.assign(NFT, metadataURI)

      const newNFT = {
        color: NFT.color,
        hair: NFT.hair,
        face: NFT.face,
        tier: NFT.tier,
        job: NFT.job,
        status: NFT.status,
        gender: NFT.gender,
        metadata: metadata,
        url: imageURL,
      }

      try {
        await MFTContract.methods
          .create("https://ipfs.io/ipfs/" + newHash.path)
          .send({ from: publicAddress })
          .then((res: any) => {
            nftTokenId = res.events.Transfer.returnValues.tokenId
            Object.assign(newNFT, { id: nftTokenId })
            console.log("최종", newNFT)
          })

        console.log("들어가나", newNFT)
        await http
          .post(`nft/result/address/${publicAddress}`, newNFT)
          .then((response) =>
            console.log("NFT DB에 저장되어 있는지 확인", response)
          )
          .catch((error) => console.error("안의 error", error))

        await setTrade((prev) => {
          const variable = { ...prev }
          variable.modalOpen6 = false
          return { ...variable }
        })

        navigate("nft/list")
      } catch (err) {
        console.error("NFT 민팅 에러", err)
      }
    })
  }

  return (
    <div className="flex w-full h-full ">
      {/* 스피너 모달 시작 */}
      <SpinnerModal
        isOpen={trade.modalOpen6}
        modalClose={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen6 = false
            return { ...variable }
          })
        }}
      >
        <Spinner />
        <div className="text-2xl font-semibold absolute mt-[70%]">
          <p className="">민팅중...</p>
        </div>
      </SpinnerModal>
      {/* 스피너 모달 끝 */}
      여기엔딩
      <div className="relative">
        <div ref={canvasRef} className="h-[400px] w-[400px] bg-blue-200">
          <img
            src={`/assets/bg/${NFT.job}.png`}
            className="h-[400px] absolute top-0 left-0"
          />
          <img
            src={`/assets/haircolor/${NFT.hair}_${NFT.color}.png`}
            className="h-[400px] absolute top-0 left-0"
          />
          <img
            src={`/assets/face/${NFT.face}.png`}
            className="h-[400px] absolute top-0 left-0"
          />
          <img
            src={`/assets/job/${NFT.job}.png`}
            className="h-[400px] absolute top-0 left-0"
          />
          <img
            src={`/assets/tier/${NFT.tier}.png`}
            className="h-[400px] absolute top-0 left-0"
          />
        </div>
      </div>
      <button className="p-10 bg-pink-400 h-[400px]" onClick={copyDOM}>
        민팅 버튼
      </button>
    </div>
  )
}
