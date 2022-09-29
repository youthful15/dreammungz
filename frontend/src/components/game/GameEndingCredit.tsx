import { useEffect, useState } from "react"
import playingGame from "../../recoil/game/atom"
import { useRecoilState } from "recoil"
import CreditImage from "./CreditImage"
import "./gameEndingCredit.css"
import FootPrint from "./FootPrint"

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
      <FootPrint />

      <div id="target">
        <div>
          <div className="h-[500px]"></div>
          {game.endingCreditData.map(
            ({
              image,
              title,
              sequence,
            }: {
              image: string
              title: string
              sequence: number
            }) => {
              return (
                <div key={sequence}>
                  {sequence % 2 === 0 ? (
                    <div className="flex justify-end mx-[60px]">
                      <CreditImage
                        imgUrl={image}
                        title={title}
                        sequence={sequence}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-start mx-[60px]">
                      <CreditImage
                        imgUrl={image}
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
