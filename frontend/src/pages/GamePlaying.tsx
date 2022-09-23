import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { http } from "../api/axios"
import findKOR from "../utils/findKOR"

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
    <div className="h-full bg-pink-100 rounded-2xl p-3 px-10">
      <div className="h-[15%] flex items-center font-bold text-lg">
        <div className="bg-brown-100 w-full flex justify-center p-2 rounded-2xl">
          <div>DREAMMUNGZ</div>
        </div>
      </div>
      <div className="h-[85%] flex flex-col justify-between pb-3">
        <div>
          귀여움
          <progress max="10" value="20" className="html5"></progress>
        </div>
        <div>
          정의로움
          {story.justice}
        </div>
        {story.status.map(({ name, value }, index) => (
          <div className="flex w-full items-center" key={index}>
            <span className="w-1/5">{findKOR(name)}</span>
            <progress max="10" value={value} className="w-4/5 html5"></progress>
          </div>
        ))}
      </div>
    </div>
  )
}

async function choiceSelect({
  id,
  setStory,
}: {
  id: number
  setStory: React.Dispatch<React.SetStateAction<StoryType>>
}) {
  const selectData = {
    address: localStorage.getItem("publicAddress"),
    selection: id,
  }

  if (id === 12) {
    window.location.replace("https://j7a605.p.ssafy.io/ending")
  } else {
    await http.post(`game/select`, selectData).then((res) => {
      console.log(res)
      setStory(res.data)
    })
  }
}

function Game({
  story,
  setStory,
}: {
  story: StoryType
  setStory: React.Dispatch<React.SetStateAction<StoryType>>
}) {
  return (
    <div className="h-full bg-beige-100 rounded-2xl p-3 px-10">
      <div className="h-[15%] flex items-center font-bold text-lg">
        <div className="bg-brown-100 w-full flex justify-center p-2 rounded-2xl">
          {story.title}
        </div>
      </div>
      <div className="h-[85%] flex flex-col justify-between pb-3">
        <div>
          <img src={story.image} alt="" />
          <div>{story.content}</div>
        </div>
        <div className="px-2">
          {story.selection.map(({ id, content }) => (
            <button
              className="w-full py-2 my-2 bg-pink-200 hover:bg-pink-500 rounded-2xl"
              key={id}
              onClick={() => choiceSelect({ id, setStory })}
            >
              {content}
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
  useEffect(() => {
    async function GetStory() {
      await http
        .get(`game/info/${localStorage.getItem("publicAddress")}`)
        .then((res) => {
          setStory(res.data)
          console.log(res)
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
        <Game story={story} setStory={setStory} />
      </div>
    </div>
  )
}
