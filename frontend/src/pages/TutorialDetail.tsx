import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import TutorialImage from "../components/tutorial/TutorialImage"

const loginTutorialContents = [
  {
    image: "/images/tutorial/login/login1.png",
    text: "1. 크롬 웹스토어에서 메타마스크를 다운받으세요",
  },
  {
    image: "/images/tutorial/login/login2.png",
    text: "2. 메타마스크에 가입하세요",
  },
  {
    image: "/images/tutorial/login/login3.png",
    text: "3. 어떤 설명을 할까요",
  },
  {
    image: "/images/tutorial/login/login4.png",
    text: "4. Ropsten 네트워크를 연결하세요",
  },
  {
    image: "/images/tutorial/login/login5.png",
    text: "5. Ropsten testnet에서 이더를 받으세요 -> https://faucet.egorfine.com/",
  },
  {
    image: "/images/tutorial/login/login6.png",
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

const TutorialDetail = () => {
  const { pathname } = useLocation()
  const [clickedImage, setClickedImage] = useState("")
  const [clickedText, setClickedText] = useState("")

  return (
    <div
      className="flex w-full h-full rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="h-full w-[256px] p-2 grid grid-cols-1 gap-y-2 overflow-y-auto scrollbar-hide">
        {pathname === "/tutorial-detail/1" &&
          loginTutorialContents.map(({ image, text }, index) => {
            return (
              <div
                className="w-[240px] h-[135px] mb-[20px] cursor-pointer m-2 bg-white"
                key={index}
              >
                <img src={`/images/tutorial/${image}`} alt="튜토리얼 이미지" />
              </div>
            )
            // return <TutorialImage image={image} text={text} key={index} />
          })}

        {pathname === "/tutorial-detail/2" &&
          gameTutorialContents.map(({ image, text }, index) => {
            return (
              <div
                className="w-[240px] h-[135px] mb-[20px] cursor-pointer rounded-lg hover:scale-105 ease-in-out transition delay-150"
                key={index}
                onClick={async () => {
                  await setClickedImage(image)
                  await setClickedText(text)
                }}
              >
                <img
                  src={`/images/tutorial/${image}`}
                  alt="튜토리얼 이미지"
                  className="rounded-lg"
                />
              </div>
            )
          })}

        {/* {pathname === "/tutorial-detail/2" &&
          gameTutorialContents.map(({ image, text }, index) => {
            return <TutorialImage image={image} text={text} key={index} />
          })}
        {pathname === "/tutorial-detail/3" &&
          tradeTutorialContents.map(({ image, text }, index) => {
            return <TutorialImage image={image} text={text} key={index} />
          })} */}
      </div>
      {clickedText ? (
        <div className="w-[738px] h-full p-4">
          <div className="flex justify-center items-center w-full h-[70%] rounded-lg border-2 border-white">
            <img src={`/images/tutorial/${clickedImage}`} alt="" />
          </div>

          <div className="flex w-full h-[30%] border-2 mt-2 border-brown-200 rounded-lg p-4">
            <p>{clickedText}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TutorialDetail
