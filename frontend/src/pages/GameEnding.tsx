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
  return (
    <div className="w-full">
      여기엔딩
      <div className="relative">
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
  )
}
