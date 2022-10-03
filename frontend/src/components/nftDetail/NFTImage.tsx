export default function NFTImage(imageUrl: any) {
  return (
    <div className="w-[50%] flex justify-center">
      <img
        className="w-[250px] h-[250px] bg-white"
        src={imageUrl.imageUrl}
        alt="NFT 이미지"
      />
    </div>
  )
}
