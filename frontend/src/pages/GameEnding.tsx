import html2canvas from "html2canvas"
import { useRef, useEffect } from "react"

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

  const copyDOM = async () => {
    window.scrollTo(0, 0)

    let url = ""
    await html2canvas(canvasRef.current!).then(async (canvas) => {
      console.log("확인용", canvas.toDataURL("image/jpg"))
      url = await canvas.toDataURL("image/jpg").split(",")[1]
      // console.log("여기왔나용", url)
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
