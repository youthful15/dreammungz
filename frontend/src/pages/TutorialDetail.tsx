import TutorialImage from "../components/tutorial/TutorialImage"
import { useLocation } from "react-router-dom"
const loginTutorialContents = [
  {
    image: "login/login1.png",
    text: "1. 크롬 웹스토어에서 메타마스크를 다운받으세요",
  },
  {
    image: "login/login2.png",
    text: "2. 메타마스크에 가입하세요",
  },
  {
    image: "login/login3.png",
    text: "3. 어떤 설명을 할까요",
  },
  {
    image: "login/login4.png",
    text: "4. Ropsten 네트워크를 연결하세요",
  },
  {
    image: "login/login5.png",
    text: "5. Ropsten testnet에서 이더를 받으세요 -> https://faucet.egorfine.com/",
  },
  {
    image: "login/login6.png",
    text: "6. 최초 회원가입하여 10000 MUNG을 받으세요!",
  },
]

const gameTutorialContents = [
  {
    image: "login/login1.png",
    text: "1. 본인 지갑 내의 코인(MUNG)은 지갑 열어보기를 통해 확인해보세요",
  },
  {
    image: "game/game2.png",
    text: "2. 메타마스크에 가입하세요",
  },
  {
    image: "game/game3.png",
    text: "3. 교배할 강아지가 없으면 아기 강아지 모드를 선택하세요",
  },
  {
    image: "game/game4.png",
    text: "4. 교배할 강아지가 있으면 부모를 조합하여 플레이해보세요",
  },
  {
    image: "game/game5.png",
    text: "5. 게임을 진행하려면 메타마스크 승인을 진행하세요",
  },
  {
    image: "game/game6.png",
    text: "6. 선택지를 선택하며 강아지의 능력치를 올려봐요",
  },
  {
    image: "game/game7.png",
    text: "7. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
  {
    image: "game/game8.png",
    text: "8. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
  {
    image: "game/game9.png",
    text: "9. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
]

const tradeTutorialContents = [
  {
    image: "login/login1.png",
    text: "1. 본인 지갑 내의 코인(MUNG)은 지갑 열어보기를 통해 확인해보세요",
  },
  {
    image: "game/game2.png",
    text: "2. 메타마스크에 가입하세요",
  },
  {
    image: "game/game3.png",
    text: "3. 교배할 강아지가 없으면 아기 강아지 모드를 선택하세요",
  },
  {
    image: "game/game4.png",
    text: "4. 교배할 강아지가 있으면 부모를 조합하여 플레이해보세요",
  },
  {
    image: "game/game5.png",
    text: "5. 게임을 진행하려면 메타마스크 승인을 진행하세요",
  },
  {
    image: "game/game6.png",
    text: "6. 선택지를 선택하며 강아지의 능력치를 올려봐요",
  },
  {
    image: "game/game7.png",
    text: "7. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
  {
    image: "game/game8.png",
    text: "8. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
  {
    image: "game/game9.png",
    text: "9. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
]

const otherTutorialContents = [
  {
    image: "login/login1.png",
    text: "1. 본인 지갑 내의 코인(MUNG)은 지갑 열어보기를 통해 확인해보세요",
  },
  {
    image: "game/game2.png",
    text: "2. 메타마스크에 가입하세요",
  },
  {
    image: "game/game3.png",
    text: "3. 교배할 강아지가 없으면 아기 강아지 모드를 선택하세요",
  },
  {
    image: "game/game4.png",
    text: "4. 교배할 강아지가 있으면 부모를 조합하여 플레이해보세요",
  },
  {
    image: "game/game5.png",
    text: "5. 게임을 진행하려면 메타마스크 승인을 진행하세요",
  },
  {
    image: "game/game6.png",
    text: "6. 선택지를 선택하며 강아지의 능력치를 올려봐요",
  },
  {
    image: "game/game7.png",
    text: "7. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
  {
    image: "game/game8.png",
    text: "8. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
  {
    image: "game/game9.png",
    text: "9. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요",
  },
]

const TutorialDetail = () => {
  const { pathname } = useLocation()
  console.log("asd", pathname)
  return (
    <div className="w-full h-full  rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500">
      <div className="h-full w-full p-4 grid grid-cols-2 gap-4 overflow-y-auto scrollbar-hide">
        {pathname === "/tutorial-detail/1" &&
          loginTutorialContents.map(({ image, text }, index) => {
            return <TutorialImage image={image} text={text} key={index} />
          })}
        {pathname === "/tutorial-detail/2" &&
          gameTutorialContents.map(({ image, text }, index) => {
            return <TutorialImage image={image} text={text} key={index} />
          })}
        {pathname === "/tutorial-detail/3" &&
          tradeTutorialContents.map(({ image, text }, index) => {
            return <TutorialImage image={image} text={text} key={index} />
          })}

        {pathname === "/tutorial-detail/4" &&
          otherTutorialContents.map(({ image, text }, index) => {
            return <TutorialImage image={image} text={text} key={index} />
          })}
      </div>
    </div>
  )
}

export default TutorialDetail
