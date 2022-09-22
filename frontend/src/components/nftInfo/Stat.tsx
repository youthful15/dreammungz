const stats: { [index: string]: string } = {
  STOUTNESS: "튼튼함",
  CLEVER: "영리함",
  QUICK: "재빠름",
  INTUITION: "직감",
  CHARISMA: "카리스마",
  POPULARITY: "인기",
  SENSIBILITY: "감수성",
  FOOTWORK: "발재주",
  VOICE: "목청",
  WEALTH: "재력",
  JUSTICE: "정의로움",
  CUTE: "귀여움",
}

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
      {stats[name]} {value}
    </div>
  )
}

export default Stat
