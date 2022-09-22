import { useState, useEffect, ChangeEvent } from "react"
import NftList from "../components/nftList/NftList"
import Filter from "../components/filter/Filter"
import useQueryParam from "../components/filter/useQueryParam"

const form = {
  job: "null",
  hair: "null",
  tier: "null",
  color: "null",
  gender: "null",
  face: "null",
  sell: false,
  status: [],
  page: 0,
  address: "myaddr",
}

const MyNftList = (props: any) => {
  let [filter, setFilter] = useState<Filter>()
  const [curPage, setPage] = useState(0)

  if (!filter) filter = form

  useEffect(() => {
    if (filter?.page === 0 && curPage === 0) return
    let newFilter: Filter = { ...filter!, page: curPage }
    setFilter(newFilter)
  }, [curPage])

  useEffect(() => {
    console.log("데이터 요청", filter)
  }, [filter])

  const formHandler = (event: ChangeEvent<HTMLFormElement>) => {
    let form = event.currentTarget
    let formData = new FormData(form)
    const newFilter: Filter = {
      ...filter!,
      page: 0,
      sell: formData.get("sell") === "on",
    }
    setFilter(newFilter)
  }

  return (
    <div className="relative h-full ">
      <form
        onChange={formHandler}
        className="absolute right-0 z-10 text-right -top-8"
      >
        <label>
          <span>판매중인것만 보기</span>
          <input type="checkbox" name="sell" />
        </label>
      </form>
      {/* <NftList page={curPage} setPage={setPage} /> */}
    </div>
  )
}

export default MyNftList
