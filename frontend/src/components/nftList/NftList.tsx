import { useRecoilValue, useSetRecoilState } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import Pagination from "../pagination/Pagination"
import NftListItem, { NftListItemType } from "./NftListItem"
import Filter from "../filter/Filter"
import { NavigateOptions, useLocation, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import useQueryParam from "../filter/useQueryParam"
import { useQuery } from "@tanstack/react-query"
import { getNftList } from "../../api/nft"
import SelectedFilters from "../filter/SelectedFilters"

const buttonStyle = "p-1 border border-gray-700 rounded-md  h-8"

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
const useNftList = (data: Filter, address: string) => {
  let filter: Filter = data === null ? filterForm : data
  return useQuery(["nftList", filter, address], () => getNftList(filter), {
    cacheTime: 0,
  })
}

const activeColor = "bg-pink"
const inactivateColor = "bg-beige-200"

const NftList = ({ useFilter }: NftListProp) => {
  const { address } = useParams()
  let [filter, setFilter] = useQueryParam<Filter>("search")
  const setShowInfo = useSetRecoilState(listModeAtom)
  const showInfo = useRecoilValue(listModeAtom)
  const [showSell, setShowSell] = useState(false)
  const [page, setPage] = useState(0)
  const { status, data, error, isFetching } = useNftList(filter!, address!)
  const pageRef = useRef(0)
  const [showForm, setShowForm] = useState(false)
  const [selectedList, setSelectedList] = useState<string[]>([])

  useEffect(() => {
    if (!filter) {
      filter = filterForm
      filter.address = address!
    }
    setPage(filter.page)
  }, [])

  useEffect(() => {
    if (!filter && address) {
      setFilter({ ...filterForm, address })
    }
    if (filter && address) setFilter({ ...filter!, address })
  }, [address])

  useEffect(() => {
    // console.log("필터 변경 ", filter?.page, pageRef.current)
    if (filter && filter.page !== pageRef.current) setPage(filter.page)
  }, [filter])

  useEffect(() => {
    if (filter) {
      const showFilter = { ...filter, sell: showSell, page: 0 }
      setFilter(showFilter)
    }
  }, [showSell])

  useEffect(() => {
    pageRef.current = page
    if (filter) {
      setFilter({ ...filter, page })
    }
  }, [page])

  const resetFilter = () => {
    setFilter({ ...filterForm })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col w-full h-[640px] text-center   ">
      <div
        className={`relative flex  w-full mb-4 space-x-2  h-[30px]   text-sm  ${
          useFilter ? "justify-between" : "justify-end"
        }`}
      >
        {useFilter && (
          <div>
            <button
              className={`w-[90px]  p-1  border border-beige-600 rounded-l-lg  h-full ml-3    ${
                showForm && "bg-blue-300"
              } `}
              onClick={() => {
                setShowForm((curState) => !curState)
              }}
            >
              {showForm ? "필터 닫기" : "필터 열기 "}
            </button>

            <button
              className={`w-[90px]  p-1  border  rounded-r-lg border-l-0  h-full  border-beige-600 `}
              onClick={() => {
                resetFilter()
              }}
            >
              필터 초기화
            </button>
          </div>
        )}
        {useFilter && (
          <div className="absolute left-0 w-full -top-[36px]">
            {filter && (
              <SelectedFilters
                filter={filter!}
                resetFilter={resetFilter}
                setFilter={setFilter}
                setSelectedList={setSelectedList}
                seletedList={selectedList}
              />
            )}
          </div>
        )}
        <div className="flex justify-end w-3/5 h-full pr-2 ">
          <div className="w-[240px] mr-1 border rounded-lg border-beige-600 h-full ">
            <button
              className={`w-1/2 h-full p-1 px-2 rounded-l-lg border border-t-0 border-l-0 border-b-0 border-r-beige-600  ${
                !showInfo && activeColor
              }`}
              onClick={() => setShowInfo(false)}
            >
              이미지만 보기
            </button>
            <button
              className={`w-1/2 h-full p-1 px-2 rounded-r-lg ${
                showInfo && activeColor
              }`}
              onClick={() => setShowInfo(true)}
            >
              정보 보기
            </button>
          </div>
          <div className="w-[200px] mr-1 border rounded-lg border-beige-600 h-full">
            <button
              className={`w-1/2 h-full p-1 px-2 rounded-l-lg border border-t-0 border-l-0 border-b-0 border-r-beige-600  ${
                showSell && activeColor
              }`}
              onClick={() => setShowSell(true)}
            >
              판매중
            </button>
            <button
              className={`w-1/2 h-full p-1 px-2 rounded-r-lg ${
                !showSell && activeColor
              }`}
              onClick={() => setShowSell(false)}
            >
              전체
            </button>
          </div>
        </div>
      </div>

      {useFilter && filter && (
        <Filter
          setFilter={setFilter}
          filter={filter}
          showForm={showForm}
          selectedList={selectedList}
        />
      )}

      <div className=" relative h-[80%] flex  flex-col justify-between ">
        <div className="flex flex-wrap h-[90%] mb-0.5 ">
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
