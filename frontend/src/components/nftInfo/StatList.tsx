import Stat, { StatType } from "./Stat"

type StatListProp = {
  statList: StatType[]
}

const StatList = ({ statList }: StatListProp) => {
  return (
    <>
      {statList.map(({ name, value }, index) => (
        <Stat name={name} value={value} key={index} />
      ))}
    </>
  )
}

export default StatList
