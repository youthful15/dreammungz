import React from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import tradeAtom from "../../recoil/trade/atom"
import memberAtom from "../../recoil/member/atom"
import { getBalance } from "../../utils/web3"

export default function OfferHistory(info: any, publicAddress: string) {
  const navigate = useNavigate()
  const [, setTrade] = useRecoilState(tradeAtom)
  const [, setMember] = useRecoilState(memberAtom)

  return (
    <div className="w-[47.5%]">
      <p className="text-xl font-semibold mb-2">오퍼 리스트</p>
      <div className="w-full bg-transparent h-[90%] shadow-sm">
        {info && info.info.offer.length > 0 ? (
          <div className="h-[280px] overflow-y-auto scrollbar-hide">
            <div className="bg-lgBrown-400 rounded-t-lg">
              <div className="flex w-full p-2">
                <p className="w-[30%]">가격</p>
                <p className="w-[40%]">제안자</p>
                <p>오퍼 날짜</p>
              </div>
            </div>
            {info.info.offer.map(
              (
                {
                  cancel,
                  choice,
                  offerAddress,
                  offerDate,
                  offerId,
                  offerNickname,
                  offerPrice,
                  refund,
                  tokenId,
                  tradeId,
                }: {
                  cancel: boolean
                  choice: boolean
                  offerAddress: string
                  offerDate: string
                  offerId: number
                  offerNickname: string
                  offerPrice: number
                  refund: boolean
                  tokenId: number
                  tradeId: number
                },
                index: number
              ) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-sm my-1 shadow-xl"
                  >
                    <ul className="w-full flex p-1">
                      <li className="w-[30%]">{offerPrice} M</li>

                      <li
                        className="w-[40%] text-lgBrown-600
hover:text-lgBrown-700 cursor-pointer"
                        onClick={() => {
                          navigate(`/personal/${offerAddress}/list`)
                        }}
                      >
                        {offerNickname}
                      </li>
                      <li>{offerDate.slice(0, 10)}</li>

                      {offerAddress === info.publicAddress ? (
                        <li
                          className="ml-3 cursor-pointer hover:scale-110"
                          onClick={async () => {
                            const receivedBalance = await getBalance()
                            setMember((prev: any) => {
                              const variable = { ...prev }
                              variable.walletBalance = receivedBalance
                              return { ...variable }
                            })
                            setTrade((prev: any) => {
                              const variable = { ...prev }
                              variable.modalOpen4 = true
                              variable.selectedOfferId = offerId
                              return { ...variable }
                            })
                          }}
                        >
                          ❌
                        </li>
                      ) : null}
                      {info.info.sellerAddress === info.publicAddress ? (
                        <li
                          className="ml-3 cursor-pointer hover:scale-110"
                          onClick={() => {
                            setTrade((prev) => {
                              const variable = { ...prev }
                              variable.modalOpen5 = true
                              variable.selectedOfferId = offerId
                              return { ...variable }
                            })
                          }}
                        >
                          ✅
                        </li>
                      ) : null}
                    </ul>
                  </div>
                )
              }
            )}
          </div>
        ) : (
          <div>오퍼 내역이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
