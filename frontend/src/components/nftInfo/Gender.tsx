import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons"

const Gender = ({ gender }: { gender: string }) => {
  return (
    <div
      className={` rounded-lg w-[20px]  h-[25px] text-center border-2  m-0.5 text-sm  bg-white  ${
        gender === "M" ? "border-blue-500" : "border-red-500"
      }`}
    >
      {gender === "M" ? (
        <FontAwesomeIcon icon={faMars} className="text-blue-500" />
      ) : (
        <FontAwesomeIcon icon={faVenus} className="text-red-500" />
      )}
    </div>
  )
}

export default Gender
