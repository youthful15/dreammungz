import { useState } from "react"
import Picture from "./Picture"
import Story from "./Story"

const info: { [index: string]: string } = {
  story:
    " 게임에 등장하는 모든 스토리입니다. 특색있고 재미있는 다양한 스토리들를 하나도 놓치지 마세요",
  pic: "게임 마다 제공되는 삽화입니다. 각각의 삽화가 어느 스토리에 등장하는지 궁금하시다면 지금 당장 게임 시작 !",
}

const Content = () => {
  const [mode, setMode] = useState("story")

  return (
    <div className="w-full h-full ">
      <h1 className="text-2xl mapleStory text-lgBrown-700 h-[5%] font-bold">
        드림멍즈의 게임 컨텐츠
      </h1>
      <div className="flex w-full  h-[95%] overflow-scroll scrollbar-hide pt-2">
        <div className="w-10/12 ">
          {mode === "story" ? <Story /> : <Picture />}{" "}
        </div>
        <div className="w-2/12 pt-2">
          <div>
            <div
              className="h-10 m-2 leading-9 text-center border-2 border-white shadow-lg cursor-pointer mapleStory text-brown hover:scale-105 bg-pink rounded-xl"
              onClick={() => {
                setMode("story")
              }}
            >
              게임 스토리
            </div>
            <div
              className="h-10 m-2 leading-9 text-center border-2 border-white shadow-lg cursor-pointer mapleStory text-brown hover:scale-105 bg-pink rounded-xl"
              onClick={() => {
                setMode("pic")
              }}
            >
              게임 삽화
            </div>
          </div>
          <div className="p-4 m-3 mt-10 border-2 rounded-lg mapleStory text-lgBrown-700 border-lgBrown-400 bg-beige-400">
            {info[mode]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
