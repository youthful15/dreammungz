import Stat, { StatType } from "./Stat"

type StatListProp = {
  statList: StatType[]
}

const StatList = ({ statList }: StatListProp) => {
  return (
    <>
      {statList.map((item) => (
        <Stat name={item.name} value={item.value} />
      ))}
    </>
  )
}

export default StatList
