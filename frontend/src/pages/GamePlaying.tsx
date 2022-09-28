import "../utils/font.css"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { http } from "../api/axios"
import findKOR from "../utils/findKOR"
import playingMusic from "../recoil/music/atom"
import parse from "html-react-parser"
import { url } from "inspector"

interface StoryType {
  title: string
  content: string
  selection: SelectType[]
  image: string
  bgm: string
  justice: number
  status: StatType[]
}
interface StatType {
  name: string
  value: number
}
interface SelectType {
  id: number
  content: string
}

function Information(story: StoryType) {
  return (
    <div className="h-full p-3 pb-5 px-10 bg-pink-100 rounded-2xl shadow-md border-2 border-pink-300 mapleStory">
      <div className="h-[15%] flex items-center font-bold text-lg">
        <div className="flex justify-center w-full p-2 bg-pink-500 rounded-2xl text-xl">
          <div>여행의 발자취</div>
        </div>
      </div>
      <div className="h-[85%] flex flex-col justify-between pb-3">
        <div className="flex">
          <span className="w-1/5 flex justify-center mr-2">귀여움</span>
          <div className="h-5 w-4/5 rounded-full relative bg-lgBrown-500">
            <div className="absolute h-5 w-full bg-gradient-to-r from-red-500 via-yellow-300 to-green-500 rounded-full border-lgBrown-500 border-[3px]"></div>
            <div className="absolute content-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
              MAX!
            </div>
          </div>
        </div>
        <div className="flex w-full items-center">
          <div className="w-1/5 flex justify-center mr-3">정의로움</div>
          {/* <div>{story.justice}</div> */}
          <div className="w-[75%] h-1 my-5 rounded-full bg-gradient-to-r from-brown-500 to-pink-500 relative">
            <span className="absolute bottom-2 text-sm right-0 text-pink-500">
              착해!
            </span>
            <span className="absolute bottom-2 text-sm left-0 text-brown-500">
              나빠!
            </span>
            <img
              src="images/paw.png"
              className={`w-10 absolute top-1/2 left-1/2 transform -translate-x-[${
                story.justice * 100 + 50
              }%] -translate-y-1/2`}
            ></img>
          </div>
        </div>
        {story.status.map(({ name, value }, index) => (
          <div className="flex items-center w-full" key={index}>
            <span className="w-1/5 flex justify-center mr-2">
              {findKOR(name)}
            </span>
            <div className="h-5 w-4/5 rounded-full relative bg-lgBrown-500">
              {value ? (
                <div
                  className={`h-5 w-[${
                    value * 10
                  }%] bg-gradient-to-r from-pink-100 to-pink-500 rounded-full border-lgBrown-500 border-4`}
                ></div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function choiceSelect({
  id,
  setStory,
  navigate,
  music,
  setMusic,
}: {
  id: number
  setStory: React.Dispatch<React.SetStateAction<StoryType>>
  navigate: any
  music: string
  setMusic: any
}) {
  const selectData = {
    address: localStorage.getItem("publicAddress"),
    selection: id,
  }

  if (id === 12) {
    navigate("/ending")
  } else {
    await http.post(`game/select`, selectData).then((res) => {
      console.log(res)
      setStory(res.data)
      if (music !== res.data.bgm) {
        setMusic(res.data.bgm)
      }
    })
  }
}

function Game({
  story,
  setStory,
  music,
  setMusic,
}: {
  story: StoryType
  setStory: React.Dispatch<React.SetStateAction<StoryType>>
  music: string
  setMusic: any
}) {
  const navigate = useNavigate()
  return (
    <div
      className="h-full p-3 pb-6 px-10 rounded-2xl ridiBatang shadow-md border-2 bg-cover bg-center"
      style={{ backgroundImage: "url(/images/chatting.png)" }}
    >
      <div className="h-[15%] flex items-center font-bold text-xl">
        <div
          className="flex justify-center items-center w-full p-2 pt-3 rounded-2xl"
          style={{ backgroundImage: "url(/images/title.png)" }}
        >
          {story.title}
        </div>
      </div>
      <div className="h-[85%] flex flex-col justify-between overflow-scroll scrollbar-hide pt-">
        {story.image ? (
          <img className="pb-5" src={`assets/illust/${story.image}`} alt="" />
        ) : null}
        <div className="text-sm leading-7 ">
          <div id="target">{parse(story.content)}</div>
        </div>
        <div className="pt-4">
          {story.selection.map(({ id, content }) => (
            <button
              className="w-full p-2 my-2 bg-pink-200 hover:bg-pink-500 rounded-2xl"
              key={id}
              onClick={() =>
                choiceSelect({ id, setStory, navigate, music, setMusic })
              }
            >
              {parse(content)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GamePlaying() {
  const [story, setStory] = useState<StoryType>({
    title: "스토리 타이틀",
    content: "장면 내용입니다 여기 어쩌고저쩌고",
    selection: [
      { id: 1, content: "그림을 그린다" },
      { id: 2, content: "글을 쓴다" },
      { id: 3, content: "이걸 한다" },
    ],
    image: "이거 삽화 이름임",
    bgm: "이거 bgm 이름임",
    justice: 10,
    status: [
      { name: "STOUTNESS", value: 10 },
      { name: "CLEVER", value: 10 },
      { name: "QUICK", value: 10 },
      { name: "INTUITION", value: 10 },
      { name: "CHARISMA", value: 10 },
      { name: "POPULARITY", value: 10 },
      { name: "SENSIBILITY", value: 10 },
      { name: "FOOTWORK", value: 10 },
      { name: "VOICE", value: 10 },
      { name: "WEALTH", value: 10 },
    ],
  })
  const [music, setMusic] = useRecoilState(playingMusic)

  useEffect(() => {
    async function GetStory() {
      await http
        .get(`game/info/${localStorage.getItem("publicAddress")}`)
        .then((res) => {
          setStory(res.data)
          console.log(res)
          if (music !== res.data.bgm) {
            setMusic(res.data.bgm)
          }
        })
    }
    GetStory()
  }, [])

  return (
    <div className="flex w-full h-full">
      <div className="w-2/5 h-full pr-5">
        <Information {...story} />
      </div>
      <div className="w-3/5 h-full pl-5">
        <Game
          story={story}
          setStory={setStory}
          music={music}
          setMusic={setMusic}
        />
      </div>
    </div>
  )
}
