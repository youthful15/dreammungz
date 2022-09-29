import { useNavigate } from "react-router-dom"
import Loading from "../components/museum/Loading/Loading"
import Test from "../components/museum/Test"

const Museum = () => {
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white">
      <div onClick={() => navigate(-1)} className="absolute z-30">
        뒤로가기
      </div>
      <Test />
      <Loading />
    </div>
  )
}

export default Museum
