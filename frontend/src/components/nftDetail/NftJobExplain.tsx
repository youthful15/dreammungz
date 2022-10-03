const jobList = [
  "왕",
  "우주비행사",
  "운동선수",
  "의사",
  "경찰",
  "요리사",
  "아이돌",
  "개발자",
  "멍피아",
  "선생님",
  "판사",
  "괴도",
  "여행자",
  "화가",
  "과학자",
  "청소부",
  "기자",
  "건물주",
  "성악가",
  "조각가",
  "무명작가",
  "유튜버",
  "보디가드",
  "점술사",
  "도둑",
  "철학자",
  "농부",
  "백수",
]

export default function NftJobExpain() {
  return (
    <div className="bg-white absolute rounded-md z-[2] w-[500px] h-[150px] shadow-md">
      <div className="flex items-center flex-col justify-center w-full h-full border-black text-base">
        <p className="text-center font-semibold text-lg">직업 목록</p>
        <div className="flex flex-col text-sm font-semibol mt-4">
          <div>왕, 우주비행사, 운동선수, 의사, 경찰, 요리사, 아이돌</div>
          <div>개발자, 멍피아, 선생님, 판사, 괴도, 여행자, 화가</div>
          <div>과학자, 청소부, 기자, 건물주, 성악가, 조각가, 무명작가</div>
          <div>유튜버, 보디가드, 점술사, 도둑, 철학자, 농부, 백수</div>
        </div>
      </div>
    </div>
  )
}
