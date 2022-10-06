import { useNavigate } from "react-router-dom"
import TutorialChapter from "../components/tutorial/TutorialChapter"

const Tutorial = () => {
  const navigate = useNavigate()
  const tutoList = [
    {
      title: "로그인 튜토리얼",
      imageName: "tutologin",
      path: "/tutorial-detail/1",
    },
    {
      title: "게임 튜토리얼",
      imageName: "tutogame",
      path: "/tutorial-detail/2",
    },
    {
      title: "오퍼 튜토리얼",
      imageName: "tutooffer",
      path: "/tutorial-detail/3",
    },
  ]
  return (
    <div className="w-full h-full rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500 text-lg flex items-center px-4">
      <div className="flex w-full h-[90%] items-center flex-col justify-center">
        <span className="text-4xl p-2 px-6 bg-brown-200 rounded-3xl font-bold">
          튜토리얼
        </span>
        <p className="pt-2 pb-5">쉽고 재밌게 드림멍즈를 즐겨보세요!</p>
        <div className="flex justify-center items-center w-full h-[75%]">
          {tutoList.map(({ title, imageName, path }, index) => {
            return (
              <TutorialChapter
                title={title}
                imageName={imageName}
                path={path}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tutorial
