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

export default function GamePlaying() {
  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 h-full bg-blue-100">{findKOR("SENSIBILITY")}</div>
      <div className="w-1/2 h-full bg-green-100">
        <div className="h-[10%]">{story.title}</div>
        <div className="h-[90%] flex flex-col justify-between">
          <div>
            <img src={story.image} alt="" />
            <div>{story.content}</div>
          </div>
          <div className="px-2">
            {story.selection.map((select, index) => (
              <div className="my-2 py-2 w-full bg-purple-100" key={index}>
                {select}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
