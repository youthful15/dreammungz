import { useNavigate } from "react-router-dom"
const Tutorial = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full  rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500 text-lg">
      <div className="flex w-full h-full items-center flex-col justify-center">
        <p className="text-4xl mt-20">튜토리얼</p>
        <div className="flex justify-center items-center w-full h-full">
          {/* 로그인 튜토리얼 시작 */}
          <div className="w-full h-[70%] p-[20px]">
            <div
              className="flex flex-col items-center justify-center w-full h-full p-4 pt-8 transition ease-in-out delay-150 rounded-lg cursor-pointer  bg-beige-100 hover:scale-105 shadow-lg"
              onClick={() => {
                navigate("/tutorial-detail/1")
              }}
            >
              <div className="w-[150px] h-[100px] rounded-lg">
                <img
                  src="https://velog.velcdn.com/images/greyzero/post/0cab7e84-f7b7-433b-9a4d-28076e54824e/image.jpeg"
                  alt=""
                  className="w-[150px] h-[100px]"
                />
              </div>
              <p className="text-2xl mt-10">로그인 튜토리얼</p>
            </div>
          </div>
          {/* 로그인 튜토리얼 끝 */}

          {/* 게임 튜토리얼 시작 */}
          <div className="w-full h-[70%] p-[20px]">
            <div
              className="flex flex-col items-center justify-center w-full h-full p-4 pt-8 transition ease-in-out delay-150 rounded-lg cursor-pointer  bg-beige-100 hover:scale-105 shadow-lg"
              onClick={() => {
                navigate("/tutorial-detail/2")
              }}
            >
              <div className="w-[100px] h-[100px] rounded-lg ">
                <img
                  src="/images/joystick.png"
                  alt=""
                  className="w-[100px] h-[100px]"
                />
              </div>
              <p className="text-2xl mt-10">게임 튜토리얼</p>
            </div>
          </div>
          {/* 게임 튜토리얼 끝 */}

          {/* 거래 튜토리얼 시작 */}
          <div className="w-full h-[70%] p-[20px]">
            <div
              className="flex flex-col items-center justify-center w-full h-full p-4 pt-8 transition ease-in-out delay-150 rounded-lg cursor-pointer  bg-beige-100 hover:scale-105 shadow-lg"
              onClick={() => {
                navigate("/tutorial-detail/3")
              }}
            >
              <div className="w-[100px] h-[100px] rounded-lg">
                <img
                  src="/images/trade.png"
                  alt=""
                  className="w-[100px] h-[100px]"
                />
              </div>
              <p className="text-2xl mt-10">거래 튜토리얼</p>
            </div>
          </div>
          {/* 거래 튜토리얼 끝 */}
        </div>
      </div>
    </div>
  )
}

export default Tutorial
