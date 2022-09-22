import React, { useState, useEffect } from "react"
import GenderTag from "../components/game/GenderTag"
import StatList from "../components/nftInfo/StatList"

const nft = [
  {
    url: "/운동멍.png",
    gender: "F",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "F",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
      {
        name: "INTUITION",
        value: 2,
      },
      {
        name: "CLEVER",
        value: 2,
      },
      {
        name: "POPULARITY",
        value: 2,
      },
    ],
  },
  {
    url: "/기자멍.png",
    gender: "M",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
  {
    url: "/운동멍.png",
    gender: "M",
    status: [
      {
        name: "VOICE",
        value: 2,
      },
      {
        name: "INTUITION",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CLEVER",
        value: 2,
      },
      {
        name: "POPULARITY",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
  {
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CHARISMA",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
]

function StartTutorial() {
  return <div> 이것은 시작할 때 띄워주는 설명입니다 </div>
}

function BabyMode() {
  return (
    <div>
      <div className="pb-10">이것은 베이비모드 설명입니다</div>
      <button className="p-10 bg-red-100" onClick={BabyModeStart}>
        100 SSF로 시작하기
      </button>
    </div>
  )
}

function ShowDog({ dog }: { dog: DogType }) {
  return (
    <div>
      <img src={dog.url} alt="dog" />
    </div>
  )
}

type DogType = {
  url: string
  gender: string
  status: StatType[]
}
type StatType = {
  name: string
  value: number
}

function BabyModeStart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  alert("결제를 해야함니다")
}
function WeddingMode() {
  const [dogF, setDogF] = useState<DogType>({ url: "", gender: "", status: [] })
  const [dogM, setDogM] = useState<DogType>({ url: "", gender: "", status: [] })

  const [babyStatus, setBabyStatus] = useState<StatType[]>([])

  useEffect(() => {
    // 아기 강아지 스테이터스 로직
    const babyStatus = [
      { name: "STOUTNESS", value: 0 },
      { name: "CLEVER", value: 0 },
      { name: "QUICK", value: 0 },
      { name: "INTUITION", value: 0 },
      { name: "CHARISMA", value: 0 },
      { name: "POPULARITY", value: 0 },
      { name: "SENSIBILITY", value: 0 },
      { name: "FOOTWORK", value: 0 },
      { name: "VOICE", value: 0 },
      { name: "WEALTH", value: 0 },
    ]
    dogF.status.forEach(({ name, value }) => {
      babyStatus.find((e) => e.name === name)!.value += value
    })
    dogM.status.forEach(({ name, value }) => {
      babyStatus.find((e) => e.name === name)!.value += value
    })

    const newStatus: StatType[] = []

    babyStatus.map((stat, index) => {
      if (stat.value) {
        newStatus.push(stat)
      }
    })

    setBabyStatus(newStatus)
  }, [dogF, dogM])

  return (
    <div className="flex h-full">
      <div className="w-[60%] h-full">
        <div className="h-[10%] flex justify-center"> 소지 NFT 목록</div>
        <div className="h-[90%] overflow-y-scroll scrollbar-hide">
          <div className="flex flex-wrap w-full">
            {nft.map((selectNft, index) => (
              <div className="w-[14%] bg-pink-500 mr-4 mb-4" key={index}>
                <div
                  className="relative mb-1 cursor-pointer"
                  onClick={() => {
                    if (selectNft.gender == "M") {
                      setDogM(selectNft)
                    } else {
                      setDogF(selectNft)
                    }
                  }}
                >
                  <img src={selectNft.url} alt="dog" />
                  <div className="absolute bottom-2 right-2">
                    <GenderTag name={selectNft.gender} />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center">
                  <StatList statList={selectNft.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-[40%] h-full">
        <div className="flex justify-center h-[10%]">
          두 마리의 강아지를 결혼시킬 수 있습니다.
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex h-[70%]">
            <div className="flex flex-col justify-center w-1/2 p-2">
              <div>엄마멍</div>
              <div>{dogF.url ? <ShowDog dog={dogF} /> : null}</div>
              <div className="flex flex-wrap">
                <StatList statList={dogF.status} />
              </div>
            </div>
            <div className="flex flex-col justify-center w-1/2 p-2">
              <div>압바멍</div>
              <div>{dogF.url ? <ShowDog dog={dogM} /> : null}</div>
              <div className="flex flex-wrap">
                <StatList statList={dogM.status} />
              </div>
            </div>
          </div>
          <div className="h-[30%]">
            <div>애기멍</div>
            <div className="flex flex-wrap">
              <StatList statList={babyStatus} />
            </div>
          </div>
        </div>
        <button className="h-[10%] bg-red-100" onClick={WeddingModeStart}>
          100 SSF로 시작하기
        </button>
      </div>
    </div>
  )
}

function WeddingModeStart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  alert("결제를 해야함니다")
}

export default function GameStart() {
  const [showContent, setContent] = useState(<StartTutorial />)

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-1/5">
        <div className="w-1/2 h-full pr-4">
          <button
            className="w-full h-full bg-blue-200"
            onClick={() => setContent(<BabyMode />)}
          >
            아기 강아지 모드 버튼
          </button>
        </div>
        <div className="w-1/2 h-full pl-4">
          <button
            className="w-full h-full bg-blue-200"
            onClick={() => setContent(<WeddingMode />)}
          >
            교배 모드 버튼
          </button>
        </div>
      </div>
      <div className="pt-8 h-4/5">
        <div className="h-full bg-blue-300">{showContent}</div>
      </div>
    </div>
  )
}
