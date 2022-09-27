import React, { useState } from "react"
import { useRecoilState } from "recoil"
import { sellFormat } from "./tradeFormat"
import tradeAtom from "../../recoil/trade/atom"
import memberAtom from "../../recoil/member/atom"
import { getBalance } from "../../utils/web3"

export default function NftSellFormat({
  publicAddress,
  tokenId,
}: {
  publicAddress: string
  tokenId: number
}) {
  const [negoAble, setNegoAble] = useState(true) // 판매 등록 정보
  const [trade, setTrade] = useRecoilState(tradeAtom)
  const [, setMember] = useRecoilState(memberAtom)
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center flex-col items-center">
        <div className="mb-4">
          <p className="text-center mb-1">즉시 구매가 설정</p>
          <div className="flex">
            <input
              id="price"
              type="text"
              onChange={(e: any) => {
                setTrade((prev) => {
                  const variable = { ...prev }
                  variable.buyNowPrice = e.target.value
                  return { ...variable }
                })
              }}
            />
            <label htmlFor="price">M</label>
          </div>
        </div>

        <div>
          <p>오퍼 유무</p>
          <div className="flex">
            <div>
              <input
                type="radio"
                id="yes"
                name="whatOffer"
                value="yes"
                checked
                onClick={() => setNegoAble(true)}
              />
              <label htmlFor="yes">Yes</label>
            </div>

            <div>
              <input
                type="radio"
                id="no"
                name="whatOffer"
                value="no"
                onClick={() => setNegoAble(false)}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
        </div>

        <div className="flex justify- center mt-5">
          <button
            type="submit"
            className="border border-black mr-5"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setMember((prev) => {
                const variable = { ...prev }
                variable.walletBalance = receivedBalance
                return { ...variable }
              })
              const buyNowPrice = trade.buyNowPrice
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = true
                return { ...variable }
              })
              sellFormat({ publicAddress, negoAble, tokenId, buyNowPrice })
            }}
          >
            판매 등록
          </button>

          <button
            className="border border-black"
            onClick={async () => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.isSellingForm = false
                return { ...variable }
              })
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}
