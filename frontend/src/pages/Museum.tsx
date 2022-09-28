import { useNavigate } from "react-router-dom"
import Test from "../components/museum/Test"

const Museum = () => {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-screen bg-white fixed top-0 left-0">
      <div onClick={() => navigate(-1)} className="absolute z-30">
        뒤로가기
      </div>
      <Test />
    </div>
  )
}

export default Museum
