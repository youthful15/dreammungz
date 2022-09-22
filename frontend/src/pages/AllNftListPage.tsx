import { useEffect, useState } from "react"
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import Filter from "../components/filter/Filter"
import NftList from "../components/nftList/NftList"
import useQueryParam from "../components/filter/useQueryParam"
import { getNftList } from "../api/nft"
import { isTemplateExpression } from "typescript"

const useNftList = (page: number) => {
  return useQuery(["nftList", page], () => getNftList(page))
}

const NftListPage = () => {
  let [filter, setFilter] = useQueryParam<Filter>("search")
  const [curPage, setPage] = useState(0)
  const { status, data, error, isFetching } = useNftList(curPage)

  if (!filter) {
    filter = {
      job: null,
      hair: null,
      tier: null,
      color: null,
      gender: null,
      face: null,
      sell: false,
      status: [],
      page: 0,
      address: null,
    }
  }

  useEffect(() => {
    if (filter?.page === 0 && curPage === 0) return
    let newFilter: Filter = { ...filter!, page: curPage }
    setFilter(newFilter)
    // console.log(newFilter)
  }, [curPage])

  useEffect(() => {
    // console.log("전송", filter)
  }, [filter])

  return (
    <div className="relative flex flex-col h-full">
      {/* <pre className="absolute right-0 z-30 bg-white">
        {JSON.stringify(filter || {}, null, 1)}
      </pre> */}

      <div className="h-[15%]">
        <Filter setFilter={setFilter} />
      </div>
      <div className="h-[85%]">
        {data && (
          <NftList
            page={curPage}
            setPage={setPage}
            totalPage={data.totalPage + 1}
            list={data.items}
          />
        )}
      </div>
    </div>
  )
}

export default NftListPage
