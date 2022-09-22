import React, { useState } from "react"
import GenderTag from "../components/game/GenderTag"
import StatList from "../components/nftInfo/StatList"

const nft = [
  {
    url: "/운동멍.png",
    gender: "F",
    status: [
      {
        name: "CUTE",
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
        name: "CUTE",
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
    url: "/무명작가멍.png",
    gender: "M",
    status: [
      {
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
        value: 2,
      },
      {
        name: "VOICE",
        value: 2,
      },
    ],
  },
]

const dogs = [
  {
    url: "/운동멍.png",
    gender: "M",
    status: [
      {
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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
        name: "CUTE",
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

function BabyModeStart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  alert("결제를 해야함니다")
}
function WeddingMode() {
  const [dogF, setDogF] = useState({})
  const [dogM, setDogM] = useState({})

  return (
    <div className="flex h-full">
      <div className="w-[60%] h-full">
        <div className="flex justify-center h-[10%]">
          두 마리의 강아지를 결혼시킬 수 있습니다.
        </div>
        <div className="h-[90%] overflow-y-scroll scrollbar-hide">
          <div className="flex flex-wrap w-full">
            {nft.map((selectNft, index) => (
              <div
                className="w-[14%] bg-pink-500 mr-4 mb-4"
                key={index}
                onClick={() => {
                  if (selectNft.gender == "M") {
                    setDogM(nft)
                  } else {
                    setDogF(nft)
                  }
                  console.log("엄마견", setDogF, "아빠견", setDogM)
                }}
              >
                <div className="relative mb-1">
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
      <div className="flex flex-col justify-center w-[40%] h-1/2">
        <div className="flex w-full">
          <div className="flex justify-center w-1/2">엄마견</div>
          <div className="flex justify-center w-1/2">압바견</div>
        </div>
        <button className="p-10 bg-red-100" onClick={WeddingModeStart}>
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
  const [dogF, setDogF] = useState({})
  const [dogM, setDogM] = useState({})

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
