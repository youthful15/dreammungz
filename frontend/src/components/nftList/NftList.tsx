import { useSetRecoilState } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import Pagination from "../pagination/Pagination"
import NftListItem, { NftListItemType } from "./NftListItem"
import Filter, { SelectedFilters } from "../filter/Filter"
import type { NavigateOptions } from "react-router-dom"
import { useEffect, useState } from "react"
import useQueryParam from "../filter/useQueryParam"
import { useQuery } from "@tanstack/react-query"
import { getNftList } from "../../api/nft"
const buttonStyle = "p-1 m-0.5 border border-gray-700 rounded-md  h-8"
const filterForm = {
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

interface NftListProp {
  useFilter: boolean
}
const useNftList = (data: Filter) => {
  let filter: Filter = data === null ? filterForm : data
  return useQuery(["nftList", filter], () => getNftList(filter), {
    cacheTime: 0,
  })
}
const NftList = ({ useFilter }: NftListProp) => {
  let [filter, setFilter] = useQueryParam<Filter>("search")
  const setShowInfo = useSetRecoilState(listModeAtom)
  const [showSell, setShowSell] = useState(false)
  const [page, setPage] = useState(0)
  const { status, data, error, isFetching } = useNftList(filter!)

  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setFilter(filterForm)
  }, [])

  useEffect(() => {
    if (filter) {
      const showFilter = { ...filter, sell: showSell, page: 0 }
      setFilter(showFilter)
    }
  }, [showSell])

  useEffect(() => {
    if (filter) {
      setFilter({ ...filter, page })
    }
  }, [page])

  const resetFilter = () => {
    setFilter({ ...filterForm })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col w-full h-[640px] text-center ">
      <div className="flex justify-end w-full mb-4 space-x-2 ">
        {useFilter && (
          <div className="flex w-3/5 ">
            <button
              className={`${buttonStyle} ${
                showForm ? "bg-blue-300" : "bg-white"
              } `}
              onClick={() => {
                setShowForm((curState) => !curState)
              }}
            >
              {showForm ? "필터 닫기" : "필터 열기 "}
            </button>
            {filter && (
              <SelectedFilters filter={filter!} resetFilter={resetFilter} />
            )}
          </div>
        )}
        <div className="w-2/5">
          <button
            className="p-1 px-2 rounded-lg bg-brown-200"
            onClick={() => setShowInfo(false)}
          >
            이미지만{" "}
          </button>
          <button
            className="p-1 px-2 rounded-lg bg-brown-200"
            onClick={() => setShowInfo(true)}
          >
            정보 보기{" "}
          </button>
          <button
            className="p-1 px-2 rounded-lg bg-brown-200"
            onClick={() => setShowSell((prev) => !prev)}
          >
            {showSell ? "전체 목록" : "판매중"}
          </button>
        </div>
      </div>

      {useFilter && filter && (
        <Filter setFilter={setFilter} filter={filter} showForm={showForm} />
      )}

      <div className=" relative h-[80%] flex  flex-col justify-between ">
        <div className="flex flex-wrap h-[98%] mb-0.5">
          {data?.items?.map((item: NftListItemType, idx: number) => {
            return <NftListItem item={item} key={item.id} />
          })}
          {data?.items?.length === 0 && (
            <div className="flex items-center justify-center w-full h-full">
              <div className="">해당 조건을 만족하는 멍개가 없습니다.</div>
            </div>
          )}
        </div>

        {data && data?.totalPage !== -1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={data.totalPage + 1}
          />
        )}
      </div>
    </div>
  )
}

export default NftList
