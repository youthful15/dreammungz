const stats: { [index: string]: string } = {
  M: "남",
  F: "여",
}

const color: { [index: string]: string } = {
  M: "bg-blue-200",
  F: "bg-pink-200",
}

export interface genderType {
  name: string
}

const genderTag = ({ name }: genderType) => {
  return (
    <div
      className={`text-black text-xs p-0.5 rounded-md m-0.5 w-5 text-center font-semibold ${color[name]}`}
    >
      {stats[name]}
    </div>
  )
}

export default genderTag
