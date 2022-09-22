import { useState } from "react"
import Pagination from "../pagination/Pagination"
import HistoryItem from "./HistoryListItem"

const items = [
  {
    id: 1,
    url: "metadata_url",
    type: "SELL",
    sellerNickname: "a12d2f3",
    sellerAddress: "0x23423423423423",
    buyerNickname: "sdf2de2",
    buyerAddress: "0x34234f3r324234",
    date: "2022-09-16",
    price: 12,
  },
  {
    id: 2,
    url: "metadata_url",
    type: "BUY",
    sellerNickname: "df2de2",
    sellerAddress: "0x34234f3r324234",
    buyerNickname: "a12d2f3",
    buyerAddress: "0x23423423423423",
    date: "yyyy-mm-dd",
    price: 12,
  },
]

const NftHistoryList = () => {
  const [page, setPage] = useState(0)
  return (
    <div className="w-full text-center border ">
      <table className="w-full border-separate table-auto border-spacing-2">
        <thead>
          <tr>
            <th>번호</th>
            <th>종류</th>
            <th>가격</th>
            <th>From</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return <HistoryItem item={item} />
          })}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} totalPage={0} />
    </div>
  )
}

export default NftHistoryList
