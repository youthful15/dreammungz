import TutorialImage from "../components/tutorial/TutorialImage"
const LoginTutorial = () => {
  return (
    <div className="w-full h-full  rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500">
      <div className="h-full w-full p-4 grid grid-cols-2 gap-4 overflow-y-auto scrollbar-hide">
        <TutorialImage
          image={"login/login1.png"}
          text="1. 크롬 웹스토어에서 메타마스크를 다운받으세요"
        />
        <TutorialImage image="image" text="2. 메타마스크에 가입하세요" />
        <TutorialImage image="image" text="3. 어떤 설명을 할까요" />
        <TutorialImage image="image" text="4. Ropsten 네트워크를 연결하세요" />
        <TutorialImage image="image" text="5. 어떤 설명을 할까요" />
        <TutorialImage
          image="image"
          text="6. 최초 회원가입하여 10000 MUNG을 받으세요!"
        />
        <TutorialImage image="image" text="7. 어떤 설명을 할까요" />
      </div>
    </div>
  )
}

export default LoginTutorial
