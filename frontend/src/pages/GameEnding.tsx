import html2canvas from "html2canvas"
import { useRef, useEffect } from "react"
import { create } from "ipfs-http-client"
import { MFTContract } from "../utils/Web3Config"
import { http } from "../api/axios"
// Nickname을 전역변수로 넣기 위한 import문
import memberAtom from "../recoil/member/atom"
import { useRecoilState } from "recoil"

const NFT = {
  color: "PINK",
  hair: "CURLY",
  face: "BEAN",
  tier: "EPIC",
  job: "DOCTOR",
  status: [
    {
      name: "CUTE",
      value: 100,
    },
    {
      name: "VOICE",
      value: 2,
    },
  ],
  gender: "M",
  id: "",
  metadata:
    "https://ipfs.io/ipfs/QmNfZ7h7cUTD8mLjpxQK6F4XrPiXHQdDx62SEeMrpbam2d",
}

export default function GameEnding() {
  const [member] = useRecoilState(memberAtom)
  const canvasRef = useRef(null)
  const client = create({
    host: "j7a605.p.ssafy.io",
    port: 5001,
    protocol: "http",
  })

  const copyDOM = async () => {
    window.scrollTo(0, 0)

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

      const file = new File([u8arr], "munggae.png", { type: mime })
      const hash = await client.add(file)
      const imageURL = "https://ipfs.io/ipfs/" + hash.path

      // 이미지 URL
      console.log("이미지 URL", imageURL)

      let newFile = {
        url: imageURL,
        color: "PINK",
        hair: "CURLY",
        face: "BEAN",
        tier: "EPIC",
        job: "DOCTOR",
        status: [
          {
            name: "CUTE",
            value: 100,
          },
          {
            name: "VOICE",
            value: 2,
          },
        ],
        gender: "M",
      }

      const newHash = await client.add(JSON.stringify(newFile))
      console.log("aa", newHash)

      const publicAddress = localStorage.getItem("publicAddress")
      // NFT Token ID
      let nftTokenId
      const metadata = "https://ipfs.io/ipfs/" + newHash.path
      const metadataURI = { metadata: metadata }
      try {
        await MFTContract.methods
          .create("https://ipfs.io/ipfs/" + newHash.path)
          .send({ from: publicAddress })
          .then((res: any) => {
            console.log("제발요", res)
            nftTokenId = res.events.Transfer.returnValues.tokenId
            newFile = Object.assign(newFile, { id: nftTokenId })
            newFile = Object.assign(newFile, metadataURI)
            console.log("뉴파일", newFile)
          })

        await http
          .post(`nft/result/address/${publicAddress}`, newFile)
          .then((response) =>
            console.log("NFT DB에 저장되어 있는지 확인", response)
          )
          .catch((error) => console.error("안의 error", error))
      } catch (err) {
        console.error("NFT 민팅 에러", err)
      }
    })
  }

  useEffect(() => {
    copyDOM()
  }, [])

  return (
    <div className="w-full">
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
    </div>
  )
}
