import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faW,
  faA,
  faS,
  faD,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import Loading from "../components/museum/Loading/Loading"
import Test from "../components/museum/Test"

const Museum = () => {
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white">
      <div
        onClick={() => navigate(-1)}
        className="absolute z-30 flex items-center text-white"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className=" w-[40px] h-[40px] text-white m-2"
        />
        <div> 돌아가기</div>
      </div>
      <div className=" w-[40px] h-[40px] text-white m-2 fixed  z-30 top-0 right-[40px] space-y-1">
        <div className="text-center border-2 rounded-lg w-[80px]">
          <FontAwesomeIcon icon={faW} /> 상
        </div>
        <div className="text-center border-2 rounded-lg w-[80px]">
          <FontAwesomeIcon icon={faS} /> 하
        </div>
        <div className="text-center border-2 rounded-lg w-[80px]">
          <FontAwesomeIcon icon={faA} /> 좌
        </div>
        <div className="text-center border-2 rounded-lg w-[80px]">
          <FontAwesomeIcon icon={faD} /> 우
        </div>
        <div className="text-center border-2 rounded-lg w-[80px]">
          ESC 커서{" "}
        </div>
      </div>
      <Test />
      <Loading />
    </div>
  )
}

export default Museum
