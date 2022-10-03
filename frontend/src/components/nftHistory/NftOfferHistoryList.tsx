import { useQueries, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getOfferHistory } from "../../api/nft"
import Pagination from "../pagination/Pagination"
import OfferHistoryItem, { OfferHistoryListHead } from "./OfferHistoryListItem"

const thead = {
  id: "ID",
  price: "가격",
  type: " 오퍼 상태 ",
  date: "오퍼 날짜 ",
}

type dealItemType = {
  cancel: boolean
  choice: boolean
  offerAddress: string
  offerDate: string
  offerId: number
  offerNickname: number
  offerPrice: number
  refund: boolean
  tokenId: number
  tradeId: number
  url: string
}

const NftOfferHistoryList = ({ address }: { address: string }) => {
  const [page, setPage] = useState(0)

  console.log(address, page)
  const { data } = useQuery(["OfferList", page], () =>
    getOfferHistory(address, page)
  )
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full text-center ">
      <div className="w-4/5 space-y-4 h-[80%] ">
        <OfferHistoryListHead item={thead} />
        {data && data.offer.length === 0 && (
          <div className=" py-28">오퍼 내역이 존재하지 않습니다.</div>
        )}
        {data &&
          data.offer.map((item: dealItemType, idx: number) => {
            const deal = { ...item, date: item.offerDate.split(" ")[0] }
            return <OfferHistoryItem item={deal} key={idx} />
          })}
      </div>
      {data?.totalPage >= 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={data.totalPage + 1}
        />
      )}
    </div>
  )
}

export default NftOfferHistoryList
