import { useState } from "react"
import Filter from "../components/filter/Filter"
import NftList from "../components/nftList/NftList"
import useQueryParam from "../components/filter/useQueryParam"
const NftListPage = () => {
  let [filter, setFilter] = useQueryParam<Filter>("search")
  const [curPage, setPage] = useState(0)

  if (!filter) {
    filter = {
      job: "null",
      hair: "null",
      tier: "null",
      color: "null",
      gender: "null",
      face: "null",
      sell: false,
      status: [],
      page: 0,
    }
  }

  return (
    <div className="relative">
      <pre className="absolute z-30 bg-white right-0">
        {JSON.stringify(filter || {}, null, 1)}
      </pre>

      <Filter setFilter={setFilter} />
      <NftList type="test" />
    </div>
  )
}

export default NftListPage
