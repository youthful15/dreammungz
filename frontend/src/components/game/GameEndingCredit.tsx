import { useEffect, useState } from "react"
import playingGame from "../../recoil/game/atom"
import { useRecoilState } from "recoil"
import CreditImage from "./CreditImage"
import "./gameEndingCredit.css"

const data = [
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2016/03/27/18/31/book-1283468__340.jpg",
    title: "START OF THE JOURNEY",
    sequence: 1,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/04/11/16/28/architecture-5031117__340.jpg",
    title: "STAIRS",
    sequence: 2,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2017/06/21/22/40/guitar-2428921__340.jpg",
    title: "MUSIC",
    sequence: 3,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2022/07/21/20/25/converse-7336903__340.jpg",
    title: "TRAVEL",
    sequence: 4,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2022/08/21/03/48/smile-7400381__340.jpg",
    title: "CHILDREN",
    sequence: 5,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2022/08/08/16/52/man-7373140__340.jpg",
    title: "OLD MAN",
    sequence: 6,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2022/01/16/13/49/dogs-6942066__340.jpg",
    title: "FRIEND",
    sequence: 7,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2022/05/01/17/35/baltic-sea-7168094__340.jpg",
    title: "BRIDGE",
    sequence: 8,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2021/10/19/09/42/nature-6723113__340.jpg",
    title: "URBAN",
    sequence: 9,
  },
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/12/02/00/57/mountain-5795883__340.jpg",
    title: "MOUNTAIN",
    sequence: 10,
  },
]

export default function GameEndingCredit() {
  const [showBtn, setShowBtn] = useState(false)
  const [game, setGame] = useRecoilState(playingGame)
  useEffect(() => {
    setTimeout(() => {
      setShowBtn(true)
    }, 5000)
  }, [])
  return (
    <div className="w-full h-full absolute z-[100] full-game-epilogue bg-lgBrown-500 overflow-hidden flex">
      {showBtn === true ? (
        <div className="flex items-end justify-end w-full">
          <button
            className="cursor-pointer z-[120] mb-2 mr-4 text-white text-xl font-semibold font-sans hover:text-brown-100"
            onClick={() => {
              setGame((prev) => {
                const variable = { ...prev }
                variable.endingCreditShow = false
                return { ...variable }
              })
            }}
          >
            SKIP
          </button>
        </div>
      ) : null}

      <div id="target">
        <div>
          <div className="h-[500px]"></div>
          {data.map(
            ({
              imgUrl,
              title,
              sequence,
            }: {
              imgUrl: string
              title: string
              sequence: number
            }) => {
              return (
                <div key={sequence}>
                  {sequence % 2 === 0 ? (
                    <div className="flex justify-end mx-[60px]">
                      <CreditImage
                        imgUrl={imgUrl}
                        title={title}
                        sequence={sequence}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-start mx-[60px]">
                      <CreditImage
                        imgUrl={imgUrl}
                        title={title}
                        sequence={sequence}
                      />
                    </div>
                  )}
                </div>
              )
            }
          )}
        </div>
      </div>
    </div>
  )
}
