import html2canvas from "html2canvas"
import { useRef, useEffect } from "react"
import { create } from "ipfs-http-client"

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
  id: 1,
}

export default function GameEnding() {
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
      console.log("확인용", url)

      const response = await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], "munggae.png", { type: "image/png" })
      const hash = await client.add(file)
      console.log("살려주세요", hash)
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
