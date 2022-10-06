import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const loginTutorialContents = [
  {
    image: "login/login1.png",
    title: "메타마스크",
    text: "1. 크롬 웹스토어에서 메타마스크를 다운받으세요",
    index: 0,
  },
  {
    image: "login/login2.png",
    title: "메타마스크",
    text: "2. 메타마스크 확장프로그램에 접속하여 지갑 가져오기 또는 지갑 생성을 진행해주세요.",
    index: 1,
  },
  {
    image: "login/login3.png",
    title: "메타마스크",
    text: "3. 네트워크 추가를 통해 SSAFY 네트워크를 추가해주세요. 차례대로 기입해주세요. 차례대로 기입해주세요. 네트워크 이름: SSAFY NETWORK, 새 RPC URL: http://20.196.209.2:8545, 체인 ID: 31221, 통화 기호: M",
    index: 2,
  },
  {
    image: "login/login4.png",
    title: "메타마스크",
    text: "4. 다시 드림멍즈 로그인을 진행해주세요. 최초 회원가입시 10000 MUNG 을 지원하고 있습니다. 로그인이 완료되면 메인페이지로 이동합니다.",
    index: 3,
  },
]

const gameTutorialContents = [
  {
    image: "game/game1.png",
    title: "게임 모드",
    text: `1. 게임 시작하기를 누르면 아기 강아지 모드와 웨딩 모드를 선택하실 수 있습니다. 아기 강아지 모드는 모든 스탯이 0부터 시작하며 게임 플레이를 위해 100 MUNG을 지불해야 합니다. 웨딩 모드는 현재 플레이어가 보유중인 NFT들 중 남성과 여성을 조합하여 향상된 스탯을 가지고 시작하며 NFT 등급에 따라 가격이 달라집니다.`,
    index: 0,
  },
  {
    image: "game/game2.png",
    title: "게임 시작",
    text: "2. 게임을 시작하기 전 게임머니를 입력하려면 메타마스크 승인을 진행해주세요.",
    index: 1,
  },
  {
    image: "game/game3.png",
    title: "게임 진행",
    text: "3. 선택지를 선택하며 강아지의 능력치를 올릴 수 있습니다.",
    index: 2,
  },
  {
    image: "game/game4.png",
    title: "게임 엔딩",
    text: "4. 게임이 끝난 후 NFT 민팅하기를 진행하여 플레이어만의 NFT를 만들 수 있습니다. 엔딩 크레딧을 보며 메타마스크 승인을 진행해주세요.",
    index: 3,
  },
]

const tradeTutorialContents = [
  {
    image: "trade/trade1.png",
    title: "판매등록",
    text: "1. 마이페이지 및 강아지 구경의 NFT 목록에서 본인의 NFT 사진을 클릭하면 판매를 등록할 수 있습니다. 판매 등록을 진행하려면 즉시 구매 가격과 제안 여부를 설정해주세요. 다음 메타마스크 승인을 진행해주세요.",
    index: 0,
  },
  {
    image: "trade/trade2.png",
    title: "판매중지",
    text: "2. 판매를 중지하려면 판매 중인 NFT 의 판매중지 버튼을 눌러 메타마스크 승인을 진행해주세요.",
    index: 1,
  },
  {
    image: "trade/trade3.png",
    title: "즉시구매와 제안",
    text: "3. NFT 구매 방법은 즉시구매와 제안 2가지가 있습니다. 즉시구매는 판매자가 설정한 가격을 지불하여 즉시 구매를 하는 방법입니다. 제안은 판매자에게 가격을 제안하여 판매자가 요청을 승인하게 되면 NFT를 얻는 방법입니다. 제안 또한 즉시구매와 마찬가지로 MUNG을 지불하여 제안합니다.",
    index: 2,
  },
  {
    image: "trade/trade4.png",
    title: "제안 취소",
    text: "4. 본인이 했던 제안을 취소하려면 NFT의 제안 이력의 ❌ 버튼을 클릭 후 메타마스크 승인을 진행해주세요.",
    index: 3,
  },
  {
    image: "trade/trade5.png",
    title: "환불",
    text: "3. 만약 제안했던 NFT를 다른 이용자가 구매를 하면 제안할때 본인이 지불했던 가격을 환불 받을 수 있습니다. 환불을 받으려면 마이페이지의 제안 내역 탭을 클릭 후 오퍼 상태가 환불 가능인 것을 찾아 클릭후 메타마스크 승인을 진행해주세요.",
    index: 4,
  },
]

const TutorialDetail = () => {
  const { pathname } = useLocation()
  const [clickedImage, setClickedImage] = useState("")
  const [clickedText, setClickedText] = useState("")
  const [clickedIndex, setClickedIndex] = useState(0)
  const [clickedTutorial, setClickedTutorial] = useState(0)
  const [clickedTitle, setClickedTitle] = useState("")

  useEffect(() => {
    async function firstCarouselSlide() {
      if (pathname === "/tutorial-detail/1") {
        setClickedTutorial(1)
      } else if (pathname === "/tutorial-detail/2") {
        setClickedTutorial(2)
      } else if (pathname === "/tutorial-detail/3") {
        setClickedTutorial(3)
      }
    }
    firstCarouselSlide()
  }, [])

  const moveLeft = async () => {
    if (clickedTutorial === 1) {
      if (clickedIndex === 0) {
        return
      } else {
        await setClickedImage(loginTutorialContents[clickedIndex - 1].image)
        await setClickedText(loginTutorialContents[clickedIndex - 1].text)
        await setClickedTitle(loginTutorialContents[clickedIndex - 1].title)
        await setClickedIndex(clickedIndex - 1)
      }
    } else if (clickedTutorial === 2) {
      if (clickedIndex === 0) {
        return
      } else {
        await setClickedImage(gameTutorialContents[clickedIndex - 1].image)
        await setClickedText(gameTutorialContents[clickedIndex - 1].text)
        await setClickedTitle(gameTutorialContents[clickedIndex - 1].title)
        await setClickedIndex(clickedIndex - 1)
      }
    } else if (clickedTutorial === 3) {
      if (clickedIndex === 0) {
        return
      } else {
        await setClickedImage(tradeTutorialContents[clickedIndex - 1].image)
        await setClickedTitle(tradeTutorialContents[clickedIndex - 1].title)
        await setClickedText(tradeTutorialContents[clickedIndex - 1].text)
        await setClickedIndex(clickedIndex - 1)
      }
    }
  }

  const moveRight = async () => {
    if (clickedTutorial === 1) {
      if (clickedIndex === loginTutorialContents.length - 1) {
        return
      } else {
        await setClickedImage(loginTutorialContents[clickedIndex + 1].image)
        await setClickedText(loginTutorialContents[clickedIndex + 1].text)
        await setClickedTitle(loginTutorialContents[clickedIndex + 1].title)

        await setClickedIndex(clickedIndex + 1)
      }
    } else if (clickedTutorial === 2) {
      if (clickedIndex === gameTutorialContents.length - 1) {
        return
      } else {
        await setClickedImage(gameTutorialContents[clickedIndex + 1].image)
        await setClickedText(gameTutorialContents[clickedIndex + 1].text)
        await setClickedTitle(gameTutorialContents[clickedIndex + 1].title)
        await setClickedIndex(clickedIndex + 1)
      }
    } else if (clickedTutorial === 3) {
      if (clickedIndex === tradeTutorialContents.length - 1) {
        return
      } else {
        await setClickedImage(tradeTutorialContents[clickedIndex + 1].image)
        await setClickedText(tradeTutorialContents[clickedIndex + 1].text)
        await setClickedTitle(tradeTutorialContents[clickedIndex + 1].title)
        await setClickedIndex(clickedIndex + 1)
      }
    }
  }

  return (
    <div
      className="flex w-full h-full rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* 좌측 슬라이더 시작 */}

      <div className="h-full w-[256px] p-2 grid grid-cols-1 gap-y-2 overflow-y-auto scrollbar-hide">
        {pathname === "/tutorial-detail/1" &&
          loginTutorialContents.map(({ image, text, title }, index) => {
            return (
              <div
                className="w-[240px] h-[135px] mb-[20px] cursor-pointer rounded-lg hover:scale-105 ease-in-out transition delay-150 shadow-lg"
                key={index}
                onClick={async () => {
                  await setClickedImage(image)
                  await setClickedText(text)
                  await setClickedTutorial(1)
                  await setClickedIndex(index)
                  await setClickedTitle(title)
                }}
              >
                <img
                  src={`/images/tutorial/${image}`}
                  alt="튜토리얼 이미지"
                  className="rounded-lg w-full h-full border-transparent border-2"
                />
              </div>
            )
          })}
        {pathname === "/tutorial-detail/2" &&
          gameTutorialContents.map(({ image, text, title }, index) => {
            return (
              <div
                className="w-[240px] h-[135px] mb-[20px] cursor-pointer rounded-lg hover:scale-105 ease-in-out transition delay-150 shadow-lg"
                key={index}
                onClick={async () => {
                  await setClickedImage(image)
                  await setClickedText(text)
                  await setClickedTutorial(2)
                  await setClickedIndex(index)
                  await setClickedTitle(title)
                }}
              >
                <img
                  src={`/images/tutorial/${image}`}
                  alt="튜토리얼 이미지"
                  className="rounded-lg w-full h-full border-transparent border-2"
                />
              </div>
            )
          })}

        {pathname === "/tutorial-detail/3" &&
          tradeTutorialContents.map(({ image, text, title }, index) => {
            return (
              <div
                className="w-[240px] h-[135px] mb-[20px] cursor-pointer rounded-lg hover:scale-105 ease-in-out transition delay-150 border-2 border-transparent"
                key={index}
                onClick={async () => {
                  await setClickedImage(image)
                  await setClickedText(text)
                  await setClickedTutorial(3)
                  await setClickedIndex(index)
                  await setClickedTitle(title)
                }}
              >
                <img
                  src={`/images/tutorial/${image}`}
                  alt="튜토리얼 이미지"
                  className="rounded-lg w-full h-full border-transparent border-2"
                />
              </div>
            )
          })}
      </div>
      {/* 좌측 슬라이더 끝 */}

      {clickedText ? (
        <div className="w-[738px] h-full p-4 rounded-lg">
          <p className="text-2xl ml-1">{clickedTitle}</p>
          <div className="flex justify-center items-center w-full h-[60%] rounded-lg border-2 border-transparent">
            <button
              className="absolute z-10 left-[550px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveLeft}
            >
              {"<"}
            </button>
            <button
              className="absolute z-10 right-[60px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveRight}
            >
              {">"}
            </button>

            <img
              src={`/images/tutorial/${clickedImage}`}
              alt=""
              className="border-2 border-transparent rounded-lg w-[696px] h-[358px]"
            />
          </div>

          <div className="flex w-[696px] h-[30%] border-2 mt-2 border-brown-200 rounded-lg p-4">
            <p>{clickedText}</p>
          </div>
        </div>
      ) : pathname === "/tutorial-detail/1" ? (
        <div className="w-[738px] h-full p-4 rounded-lg">
          <p className="text-2xl ml-1">{loginTutorialContents[0].title}</p>
          <div className="flex justify-center items-center w-full h-[60%] rounded-lg border-2 border-transparent">
            <button
              className="absolute z-10 left-[550px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveLeft}
            >
              {"<"}
            </button>
            <button
              className="absolute z-10 right-[60px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveRight}
            >
              {">"}
            </button>
            <img
              src={`/images/tutorial/${loginTutorialContents[0].image}`}
              alt=""
              className="border-2 border-transparent rounded-lg w-[696px] h-[358px]"
            />
          </div>

          <div className="flex w-[696px] h-[30%] border-2 mt-2 border-brown-200 rounded-lg p-4">
            <p>{loginTutorialContents[0].text}</p>
          </div>
        </div>
      ) : pathname === "/tutorial-detail/2" ? (
        <div className="w-[738px] h-full p-4 rounded-lg">
          <p className="text-2xl ml-1">{gameTutorialContents[0].title}</p>
          <div className="flex justify-center items-center w-full h-[60%] rounded-lg border-2 border-transparent">
            <button
              className="absolute z-10 left-[550px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveLeft}
            >
              {"<"}
            </button>
            <button
              className="absolute z-10 right-[60px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveRight}
            >
              {">"}
            </button>

            <img
              src={`/images/tutorial/${gameTutorialContents[0].image}`}
              alt=""
              className="border-2 border-transparent rounded-lg w-[696px] h-[358px]"
            />
          </div>

          <div className="flex w-[696px] h-[30%] border-2 mt-2 border-brown-200 rounded-lg p-4">
            <p>{gameTutorialContents[0].text}</p>
          </div>
        </div>
      ) : pathname === "/tutorial-detail/3" ? (
        <div className="w-[738px] h-full p-4 rounded-lg">
          <p className="text-2xl ml-1">{tradeTutorialContents[0].title}</p>
          <div className="flex justify-center items-center w-full h-[60%] rounded-lg ">
            <button
              className="absolute z-10 left-[550px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveLeft}
            >
              {"<"}
            </button>
            <button
              className="absolute z-10 right-[60px] h-[25px] w-[25px] rounded-full bg-beige-100 hover:scale-110"
              onClick={moveRight}
            >
              {">"}
            </button>
            <img
              src={`/images/tutorial/${tradeTutorialContents[0].image}`}
              alt=""
              className="border-2 border-transparent rounded-lg  w-[696px] h-[358px]"
            />
          </div>

          <div className="flex w-[696px] h-[30%] border-2 mt-2 border-brown-200 rounded-lg p-4">
            <p>{tradeTutorialContents[0].text}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TutorialDetail
