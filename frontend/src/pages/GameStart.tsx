import React, { useState } from "react"

function StartTutorial() {
  return <div> 이것은 시작할 때 띄워주는 설명입니다 </div>
}

function BabyMode() {
  return (
    <div>
      <div className="pb-10">이것은 베이비모드 설명입니다</div>
      <button className="bg-red-100 p-10" onClick={BabyModeStart}>
        100 SSF로 시작하기
      </button>
    </div>
  )
}

function BabyModeStart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  alert("결제를 해야함니다")
}

function WeddingMode() {
  return (
    <div>
      <div>이것은 교배모드 설명입니다</div>
      <button className="bg-red-100 p-10" onClick={WeddingModeStart}>
        100 SSF로 시작하기
      </button>
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
      <div className="h-1/5 w-full flex">
        <div className="w-1/2 h-full pr-4">
          <button
            className="h-full bg-blue-200 w-full"
            onClick={() => setContent(<BabyMode />)}
          >
            아기 강아지 모드 버튼
          </button>
        </div>
        <div className="w-1/2 h-full pl-4">
          <button
            className="h-full bg-blue-200 w-full"
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
