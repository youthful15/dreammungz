import KOR from "../../utils/findKOR"
const color: { [index: string]: string } = {
  WEALTH: "bg-yellow-300",
  VOICE: "bg-amber-300",
  STOUTNESS: "bg-cyan-400",
  SENSIBILITY: "bg-rose-300",
  QUICK: "bg-teal-300",
  POPULARITY: "bg-fuchsia-300",
  INTUITION: "bg-sky-300",
  FOOTWORK: "bg-orange-300",
  CLEVER: "bg-lime-300",
  CHARISMA: "bg-indigo-300",
  JUSTICE: " bg-stone-300",
  CUTE: "bg-emerald-300",
}

export interface StatType {
  name: string
  value: number
}

const Stat = ({ name, value }: StatType) => {
  return (
    <div
      className={`text-black text-xs p-0.5 rounded-md m-0.5 w-20 text-center font-semibold ${color[name]} shadow-sm border border-white`}
    >
      {KOR(name)} {value}
    </div>
  )
}

export default Stat
