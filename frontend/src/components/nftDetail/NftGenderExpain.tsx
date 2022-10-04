import Gender from "../nftInfo/Gender"

export default function NftGenderExpain() {
  return (
    <div className="bg-white absolute rounded-md z-[2] w-[200px] h-[150px] right-[210px] shadow-md">
      <div className="flex items-center flex-col justify-center w-full h-full border-black text-base">
        <p className="font-semibold text-lg mb-2">성별</p>

        <div className="flex">
          <div className="flex items-center mr-2">
            <Gender gender="M" />
            <p className="ml-2">남성</p>
          </div>
          <div className="flex items-center ml-2">
            <Gender gender="F" />
            <p className="ml-2">여성</p>
          </div>
        </div>
      </div>
    </div>
  )
}
