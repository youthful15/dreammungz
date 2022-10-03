import { useRecoilState } from "recoil"
import tooltipAtom from "../../recoil/tooltip/atom"
import StatList from "../nftInfo/StatList"

export default function NftAbilityExplain() {
  const [tool, setTool] = useRecoilState(tooltipAtom)

  const tooltipOff = async () => {
    await setTool((prev) => {
      const variable = { ...prev }
      variable.abilityExplainShow = false
      return { ...variable }
    })
  }

  const statusList: any = [
    {
      name: "STOUTNESS",
      value: "",
    },
    {
      name: "CLEVER",
      value: "",
    },
    {
      name: "QUICK",
      value: "",
    },
    {
      name: "INTUITION",
      value: "",
    },
    {
      name: "CHARISMA",
      value: "",
    },
    {
      name: "POPULARITY",
      value: "",
    },
    {
      name: "SENSIBILITY",
      value: "",
    },
    {
      name: "VOICE",
      value: "",
    },
    {
      name: "WEALTH",
      value: "",
    },
    {
      name: "JUSTICE",
      value: "",
    },
    {
      name: "CUTE",
      value: "",
    },
  ]
  return (
    <div
      className="bg-white absolute rounded-md z-[2] w-[200px] h-[100px]"
      onMouseLeave={tooltipOff}
    >
      <div className="flex items-center flex-col justify-center w-full h-full border-black text-base">
        <p>STAT LIST</p>

        <div className="flex">
          <StatList statList={statusList} />
        </div>
      </div>
    </div>
  )
}
