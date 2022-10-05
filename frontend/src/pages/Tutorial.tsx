import { useNavigate } from "react-router-dom"
const Tutorial = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full  rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500 text-lg">
      <div className="flex w-full h-full items-center flex-col justify-center">
        <p className="text-4xl mt-10">튜토리얼</p>
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          <div
            className="w-full h-full p-2"
            onClick={() => {
              navigate("/tutorial-detail/2")
            }}
          >
            <div className="flex flex-col items-center w-full h-full p-4 pt-8 transition ease-in-out delay-150 rounded-lg cursor-pointer  bg-beige-100 hover:scale-105">
              <p>게임 튜토리얼</p>
            </div>
          </div>

          <div
            className="w-full h-full p-2"
            onClick={() => {
              navigate("/tutorial-detail/3")
            }}
          >
            <div className="flex flex-col items-center w-full h-full p-4 pt-8 transition ease-in-out delay-150 rounded-lg cursor-pointer  bg-beige-100 hover:scale-105">
              <p>거래 튜토리얼</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
