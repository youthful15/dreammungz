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
  console.log(info)
  return (
    <div className="w-[47.5%] border rounded-lg border-black">
      <p className="text-xl font-semibold ml-2">오퍼 리스트</p>
      <div className="w-full bg-transparent h-[90%] p-2">
        {info && info.info.offer.length > 0 ? (
          <div>
            <div>
              <div className="flex w-full border border-b-black border-t-transparent border-l-transparent border-r-transparent">
                <p className="w-[20%]">가격</p>
                <p className="w-[40%]">From</p>
                <p>Date</p>
              </div>
            </div>
            {info.info.offer.map(
              ({
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
              }) => {
                return (
                  <div className="" key={tradeId}>
                    <ul className="w-full flex py-1">
                      <li className="w-[20%]">{offerPrice}</li>

                      <li
                        className="w-[40%] text-lgBrown-600
hover:text-lgBrown-700 cursor-pointer"
                        onClick={() => {
                          navigate(`/personal/${offerAddress}/list`)
                        }}
                      >
                        {offerNickname}
                      </li>
                      <li>{offerDate}</li>

                      {offerAddress === info.publicAddress ? (
                        <li
                          className="w-[10%] cursor-pointer"
                          onClick={async () => {
                            const receivedBalance = await getBalance()
                            setMember((prev) => {
                              const variable = { ...prev }
                              variable.walletBalance = receivedBalance
                              return { ...variable }
                            })
                            setTrade((prev) => {
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
                          className="cursor-pointer"
                          onClick={() => {
                            setTrade((prev) => {
                              const variable = { ...prev }
                              variable.modalOpen5 = true
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
          <div>There is no offer</div>
        )}
      </div>
    </div>
  )
}
