import React from "react"
import { useNavigate } from "react-router-dom"

export default function TradeHistory(info: any) {
  const navigate = useNavigate()
  return (
    <div className="w-[47.5%] border rounded-lg border-black">
      <p className="text-xl font-semibold ml-2">거래 이력</p>
      <div className="w-full h-[90%] bg-transparent p-2">
        {info && info.info.trade.length > 0 ? (
          <div>
            <div className="flex w-full border border-b-black border-t-transparent border-l-transparent border-r-transparent">
              <p className="w-[20%]">가격</p>
              <p className="w-[20%]">From</p>
              <p className="w-[30%]">To</p>
              <p>Date</p>
            </div>
            {info.info.trade.map(
              ({
                buyerAddress,
                buyerNickname,
                sellerAddress,
                sellerNickname,
                tradeDate,
                tradeId,
                tradePrice,
              }: {
                buyerAddress: string
                buyerNickname: string
                sellerAddress: string
                sellerNickname: string
                tradeDate: string
                tradeId: number
                tradePrice: number
              }) => {
                return (
                  <div key={tradeId}>
                    <ul className="flex py-1">
                      <li className="w-[20%]">{tradePrice}</li>

                      <li
                        className="w-[20%] text-lgBrown-600
 hover:text-lgBrown-700 cursor-pointer"
                        onClick={() => {
                          navigate(`/personal/${sellerAddress}/list`)
                        }}
                      >
                        {sellerNickname}
                      </li>
                      <li
                        className="w-[30%] text-lgBrown-600
 hover:text-lgBrown-700 cursor-pointer"
                        onClick={() => {
                          navigate(`/personal/${buyerAddress}/list`)
                        }}
                      >
                        {buyerNickname}
                      </li>
                      <li>{tradeDate}</li>
                    </ul>
                  </div>
                )
              }
            )}
          </div>
        ) : (
          <div>거래 내역이 없습니다.</div>
        )}
      </div>
    </div>
  )
}
