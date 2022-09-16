import React from "react"
import findKOR from "../utils/findKOR"

const story = {
  title: "스토리 타이틀",
  content: "장면 내용입니다 여기 어쩌고저쩌고",
  selection: ["그림을 그린다.", "VS코드를 켠다.", "타입스크립트 싫다"],
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
}

function Information() {
  return (
    <div className="h-full">
      <div>아무튼 게임스러운 디자인</div>
      <div>더 넣을게 뭐가 있을까</div>
      <div>
        귀여움
        <progress max="20" value="20" className="html5"></progress>
      </div>
      <div>
        정의로움
        {story.justice}
      </div>
      {story.status.map(({ name, value }, index) => (
        <div className="flex w-full">
          <span className="w-1/5">{findKOR(name)}</span>
          <progress max="20" value={value} className="w-4/5 html5"></progress>
        </div>
      ))}
    </div>
  )
}

function Game() {
  const choiceSelect = (index: number) =>
    alert(index + 1 + "번 선택지를 고르셨습니다.")

  return (
    <div className="h-full">
      <div className="h-[10%]">{story.title}</div>
      <div className="h-[90%] flex flex-col justify-between">
        <div>
          <img src={story.image} alt="" />
          <div>{story.content}</div>
        </div>
        <div className="px-2">
          {story.selection.map((select, index) => (
            <button
              className="my-2 py-2 w-full bg-purple-100"
              key={index}
              onClick={() => choiceSelect((index = index))}
            >
              {select}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GamePlaying() {
  return (
    <div className="w-full h-full flex">
      <div className="w-2/5 h-full bg-blue-100">
        <Information />
      </div>
      <div className="w-3/5 h-full bg-green-100">
        <Game />
      </div>
    </div>
  )
}
