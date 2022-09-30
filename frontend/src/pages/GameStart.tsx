import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { start } from "repl"
import { http } from "../api/axios"
import GenderTag from "../components/game/GenderTag"
import StatList from "../components/nftInfo/StatList"
import { pushGameStart } from "../utils/web3"
import SpinnerModal from "../components/modal/SpinnerModal"
import Spinner from "../components/spinner/Spinner"
import { useRecoilState } from "recoil"
import tradeAtom from "../recoil/trade/atom"
const publicAddress = localStorage.getItem("publicAddress")

let startSetting = {
  address: publicAddress,
  father: "",
  mating: false,
  mother: "",
}

// 게임 시작 API
function useMovePage(price: number) {
  const navigate = useNavigate()
  const [trade, setTrade] = useRecoilState(tradeAtom)

  async function MovePage() {
    console.log(startSetting)

    await setTrade((prev) => {
      const variable = { ...prev }
      variable.modalOpen6 = true
      return { ...variable }
    })

    // 결제 로직
    await pushGameStart(publicAddress, price)

    await setTrade((prev) => {
      const variable = { ...prev }
      variable.modalOpen6 = false
      return { ...variable }
    })
    // price 만큼 결제합니다. 결제 성공시 아래 navigate 실행~
    await http.post(`game/start`, startSetting).then((res) => {
      console.log("넘기자", startSetting)
      navigate("/game")
    })
    startSetting.mating = true
  }
  return MovePage
}

// 시작 화면 설명
function StartTutorial() {
  return (
    <div
      className="w-full h-full rounded-3xl bg-cover border-pink-500 shadow-md relative"
      style={{ backgroundImage: "url(/images/mode.png)" }}
    >
      <div className="h-full w-full ridiBatang ">
        <div className="absolute left-[100px] top-[80px] flex flex-col items-center">
          <img src="/dreammungz.svg" className="w-[300px] pb-3" alt="logo" />
          <p className="pb-5">모드를 선택하고 당신만의 강아지를 키워보세요.</p>
          <p className="pb-1">처음 시작하는 유저에게는 아기 강아지 모드를,</p>
          <p>다회차 플레이 유저에게는 웨딩 모드를 권장합니다.</p>
        </div>
      </div>
    </div>
  )
}

// 베이비 모드 설명
function BabyMode() {
  const MovePage = useMovePage(100)
  function StartGame() {
    MovePage()
  }

  return (
    <div
      className="w-full h-full rounded-3xl bg-cover hadow-md relative bg-white flex "
      // style={{ backgroundImage: "url(/images/mode.png)" }}
    >
      <div className="w-full ridiBatang flex flex-col justify-center items-center">
        <div className="flex pb-7">
          <div className="flex items-end flex-col justify-center">
            <span className="bg-lgBrown-200 mapleStory rounded-2xl h-[35px] flex items-center px-4 mb-2">
              출발하자!
            </span>
            <span className="bg-lgBrown-200 mapleStory rounded-2xl h-[35px] flex items-center px-4">
              나 빨리 가고 싶어!
            </span>
          </div>
          <img src="/images/mung.png" alt="" className="h-[150px]" />
        </div>
        <p className="pb-1">강아지 육성을 새롭게 시작합니다.</p>
        <p>모든 스탯이 0부터 시작합니다.</p>
        <button
          className="p-5 px-10 mt-5 bg-pink-500 rounded-3xl mapleStory text-xl"
          onClick={StartGame}
        >
          100 MUNG으로 시작하기
        </button>
      </div>
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
  id: string
  tier: string
}
type StatType = {
  name: string
  value: number
}

// 웨딩 모드 설명
function WeddingMode() {
  const [price, setPrice] = useState<any>(0)
  const [nft, setNft] = useState([
    {
      id: "",
      url: "",
      gender: "",
      status: [
        {
          name: "",
          value: 2,
        },
        {
          name: "",
          value: 2,
        },
      ],
      tier: "",
    },
  ])

  useEffect(() => {
    let nftList
    async function nftGet() {
      nftList = await http.get(
        `nft/address/${localStorage.getItem("publicAddress")}`
      )
      setNft(nftList.data.items)
    }
    nftGet()
  }, [])

  const MovePage = useMovePage(price)
  function StartGame() {
    MovePage()
  }

  const [dogF, setDogF] = useState<DogType>({
    url: "",
    gender: "",
    status: [],
    id: "",
    tier: "",
  })
  const [dogM, setDogM] = useState<DogType>({
    url: "",
    gender: "",
    status: [],
    id: "",
    tier: "",
  })

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

    // 가격 계산 로직
    const priceLogic: object = {
      NORMAL: 100,
      RARE: 200,
      EPIC: 300,
      UNIQUE: 400,
      LEGENDARY: 500,
    }

    if (dogF.tier && dogM.tier) {
      setPrice(
        priceLogic[dogF.tier as keyof object] +
          priceLogic[dogM.tier as keyof object]
      )
    } else if (dogF.tier) {
      setPrice(priceLogic[dogF.tier as keyof object])
    } else if (dogM.tier) {
      setPrice(priceLogic[dogM.tier as keyof object])
    }
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
              <div>{dogM.url ? <ShowDog dog={dogM} /> : null}</div>
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
        <button
          className="h-[10%] bg-red-100"
          onClick={() => {
            startSetting.father = dogM.id
            startSetting.mother = dogF.id
            startSetting.mating = true
            StartGame()
          }}
        >
          {price} MUNG으로 시작하기
        </button>
      </div>
    </div>
  )
}

export default function GameStart() {
  const [showContent, setContent] = useState(<StartTutorial />)
  const [trade, setTrade] = useRecoilState(tradeAtom)
  console.log(trade.modalOpen6)
  return (
    <div className="w-full h-full">
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
        <div className="flex items-center flex-col">
          <Spinner />
          <p className="text-2xl font-semibold absolute mt-[75%]">
            강아지 입양중
          </p>
        </div>
      </SpinnerModal>
      {/* 스피너 모달 끝 */}

      <div className="flex w-full h-1/5">
        <div className="w-1/2 h-full pr-4">
          <button
            className="w-full h-full rounded-3xl border-4 border-brown-300 mapleStory font-bold text-4xl shadow-md click:mt-1 bg-cover bg-center bg-beige-100 flex justify-center items-center"
            onClick={() => setContent(<BabyMode />)}
            style={{ backgroundImage: "url(/images/babymode.png)" }}
          >
            <div className="text-brown-500 rounded-3xl bg-white p-5 w-[90%]">
              아기 강아지 모드
            </div>
          </button>
        </div>
        <div className="w-1/2 h-full pl-4">
          <button
            className="w-full h-full rounded-3xl border-4 border-pink-500 mapleStory font-bold text-4xl shadow-md click:mt-1 bg-cover bg-center bg-pink-100 flex justify-center items-center"
            onClick={() => setContent(<WeddingMode />)}
            style={{ backgroundImage: "url(/images/weddingmode.png)" }}
          >
            <div className="text-red-300 rounded-3xl bg-white p-5 w-[90%]">
              웨딩 모드
            </div>
          </button>
        </div>
      </div>
      <div className="pt-8 h-4/5">
        <div className="h-full w-full">{showContent}</div>
      </div>
    </div>
  )
}
