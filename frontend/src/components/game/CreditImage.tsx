export default function CreditImage({
  imgUrl,
  title,
  sequence,
}: {
  imgUrl: string
  title: string
  sequence: number
}) {
  return (
    // 사진 image 사이즈 : w-[487px] h-[250px]
    <div>
      {sequence % 2 === 0 ? (
        // 왼쪽 사진
        <div className="w-[400px] h-[400px] bg-white shadow-2xl px-4 pt-4 rotate-12">
          <div className="border-2 rounded-full bg-red-500 w-1"></div>
          <img
            src={`images/${imgUrl}`}
            className="pb-[20px]"
            alt="엔딩크레딧 이미지"
          />
          <p className="mapleStory mt-4">{title}</p>
        </div>
      ) : (
        // 오른쪽 사진
        <div className="w-[400px] h-[400px] bg-white top-[0px] my-10 shadow-2xl px-4 pt-4 -rotate-12">
          <img
            src={`images/${imgUrl}`}
            className="pb-[20px]"
            alt="엔딩크레딧 이미지"
          />
          <p className="mapleStory mt-4">{title}</p>
        </div>
      )}
    </div>
  )
}
