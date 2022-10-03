import React from "react"
import { useNavigate } from "react-router-dom"

export default function TradeHistory(info: any) {
  const navigate = useNavigate()
  return (
    <div className="w-[47.5%]">
      <p className="text-xl font-semibold mb-2">거래 이력</p>
      <div className="w-full h-[90%] bg-transparent shadow-sm">
        {info && info.info.trade.length > 0 ? (
          <div className="h-[280px] overflow-y-auto scrollbar-hide">
            <div className="flex w-full bg-lgBrown-400 rounded-t-lg">
              <div className="flex w-full p-2">
                <p className="w-[20%]">가격</p>
                <p className="w-[30%]">판매자</p>
                <p className="w-[25%]">구매자</p>
                <p>거래 날짜</p>
              </div>
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
                  <div
                    key={tradeId}
                    className="bg-white rounded-sm my-1 shadow-xl"
                  >
                    <ul className="w-full flex p-1">
                      <li className="w-[20%]">{tradePrice} M</li>

                      <li
                        className="w-[30%] text-lgBrown-600
 hover:text-lgBrown-700 cursor-pointer"
                        onClick={() => {
                          navigate(`/personal/${sellerAddress}/list`)
                        }}
                      >
                        {sellerNickname}
                      </li>
                      <li
                        className="w-[25%] text-lgBrown-600
 hover:text-lgBrown-700 cursor-pointer"
                        onClick={() => {
                          navigate(`/personal/${buyerAddress}/list`)
                        }}
                      >
                        {buyerNickname}
                      </li>
                      <li>{tradeDate.slice(0, 10)}</li>
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
