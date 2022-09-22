const stats: { [index: string]: string } = {
  M: "남",
  F: "여",
}

const color: { [index: string]: string } = {
  M: "bg-blue-200",
  F: "bg-pink-200",
}

<<<<<<< HEAD
export interface GenderType {
  name: string
}

const GenderTag = ({ name }: GenderType) => {
  return (
    <div
      className={`text-black text-xs p-0.5 rounded-md m-0.5 w-6 text-center font-semibold shadow-xl border-white ${color[name]}`}
=======
export interface genderType {
  name: string
}

const genderTag = ({ name }: genderType) => {
  return (
    <div
      className={`text-black text-xs p-0.5 rounded-md m-0.5 w-5 text-center font-semibold ${color[name]}`}
>>>>>>> 5b8ef34d1a964d7f2023e35568f1dcfd80c46911
    >
      {stats[name]}
    </div>
  )
}

<<<<<<< HEAD
export default GenderTag
=======
export default genderTag
>>>>>>> 5b8ef34d1a964d7f2023e35568f1dcfd80c46911
