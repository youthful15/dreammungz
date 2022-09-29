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
import Museum from "../components/museum/Museum"

const MuseumPage = () => {
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
      <div className=" w-[40px] h-[40px] text-white m-2 fixed  z-30 top-[45px] left-[0px] space-y-1">
        <div className="text-center rounded-lg w-[280px]  fixed top-0 right-0">
          화면 클릭 후 각도를 변경할 수 있습니다.
        </div>
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
      <Museum />
      <Loading />
    </div>
  )
}

export default MuseumPage
