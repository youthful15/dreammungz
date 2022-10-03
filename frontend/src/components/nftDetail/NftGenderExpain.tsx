import { useRecoilState } from "recoil"
import tooltipAtom from "../../recoil/tooltip/atom"
import Gender from "../nftInfo/Gender"

export default function NftGenderExpain() {
  const [tool, setTool] = useRecoilState(tooltipAtom)
  const tooltipOff = async () => {
    await setTool((prev) => {
      const variable = { ...prev }
      variable.genderExplainShow = false
      return { ...variable }
    })
  }
  return (
    <div
      onMouseLeave={tooltipOff}
      className="bg-white absolute rounded-md z-[2] w-[200px] h-[100px]"
    >
      <div className="flex items-center flex-col justify-center w-full h-full border-black text-base">
        <p>성별은 여자와 남자가 있습니다.</p>

        <div className="flex">
          <p>남성</p>
          <Gender gender="M" />
        </div>
        <div className="flex">
          <p>여성</p>
          <Gender gender="F" />
        </div>
      </div>
    </div>
  )
}
