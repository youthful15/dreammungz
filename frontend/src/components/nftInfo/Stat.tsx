import KOR from "../../utils/findKOR"
const color: { [index: string]: string } = {
  STOUTNESS: "bg-cyan-400",
  CLEVER: "bg-lime-300",
  QUICK: "bg-teal-300",
  INTUITION: "bg-sky-300",
  CHARISMA: "bg-indigo-300",
  POPULARITY: "bg-fuchsia-300",
  SENSIBILITY: "bg-rose-300",
  FOOTWORK: "bg-orange-300",
  VOICE: "bg-amber-300",
  WEALTH: "bg-yellow-300",
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
      className={`text-black text-xs p-0.5 rounded-md m-0.5 w-20 text-center font-semibold ${color[name]}`}
    >
      {KOR(name)} {value}
    </div>
  )
}

export default Stat
