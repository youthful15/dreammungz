import { useNavigate } from "react-router-dom"
const Tutorial = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full  rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500">
      <div className="flex w-full h-full items-center flex-col justify-center">
        <p className="text-4xl mt-10">튜토리얼</p>
        <div className="flex w-full h-full justify-center items-center">
          <div
            className="w-1/2 h-[450px] p-4"
            onClick={() => {
              navigate("/game-tutorial")
            }}
          >
            <div className="flex flex-col items-center w-full h-full p-4 pt-8 transition ease-in-out delay-150 rounded-lg cursor-pointer  bg-beige-100 hover:scale-105">
              <p>게임 튜토리얼</p>
            </div>
          </div>

          <div
            className="w-1/2 h-[450px] p-4"
            onClick={() => {
              navigate("/login-tutorial")
            }}
          >
            <div className="flex flex-col items-center w-full h-full p-4 pt-8 transition ease-in-out delay-150 rounded-lg cursor-pointer  bg-beige-100 hover:scale-105">
              <p>로그인 튜토리얼</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
