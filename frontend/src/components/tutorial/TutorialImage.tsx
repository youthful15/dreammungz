export default function TutorialImage({
  image,
  text,
}: {
  image: string
  text: string
}) {
  return (
    <div className="w-[470px] h-[470px]">
      <div className="h-[90%] bg-slate-200">
        <img
          className="h-full w-full"
          src={`/images/tutorial/${image}`}
          alt="튜토리얼 이미지"
        />
      </div>
      <p className="h-[10%] flex justify-start">{text}</p>
    </div>
  )
}