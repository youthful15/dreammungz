import Carousel from "../components/carousel/Carousel"

export default function MainPageOriginal() {
  return (
    <div className="w-full h-full">
      <div className="h-[50%] py-1">
        <div className="h-[50%]">
          <div className="bg-slate-300 h-full">
            <p>드림멍즈가 처음이신가요? 튜토리얼 바로가기</p>
          </div>
        </div>
        <div className="h-[50%] py-1">
          <div className="h-full">
            <Carousel />
          </div>
        </div>
      </div>

      <div className="flex h-[50%]">
        <aside className="w-[50%] h-full">
          <p className="font-semibold text-lg h-[10%]">취뽀 강아지</p>
          <div className="grid grid-cols-2 gap-1 h-[90%] p-2">
            <div className="bg-slate-300 hover:scale-[110%]">1</div>
            <div className="bg-slate-400 hover:scale-[110%]">2</div>
            <div className="bg-slate-500 hover:scale-[110%]">3</div>
            <div className="bg-slate-600 hover:scale-[110%]">4</div>
          </div>
        </aside>
        <aside className="w-[50%] h-full p-2">
          <p className="font-semibold text-lg h-[10%]">공략 게시판</p>
          <div className="bg-slate-600 h-[90%]">공략입니다.</div>
        </aside>
      </div>
    </div>
  )
}
