import { useEffect, useState } from "react"

const totalPage = 182
const limit = 10
const activeStyle = "bg-blue-300"
const curPage = 12
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setCurrentPage(curPage)
  }, [])

  useEffect(() => {
    const tmpOffset = Math.floor(currentPage / limit)

    if (tmpOffset !== offset) setOffset(tmpOffset)
  }, [currentPage])

  const clickPage = (num: number) => {
    if (num + 1 > totalPage) return
    setCurrentPage(num)
  }

  return (
    <>
      {/* <div>페이지 인덱스:{currentPage}</div>
      <div>페이지 오프셋:{offset}</div> */}
      <div className="flex  justify-center">
        <div className="w-8 h-8 border m-1 " onClick={() => clickPage(0)}>
          {"<<"}
        </div>
        <div
          className="w-8 h-8 border m-1 "
          onClick={() => clickPage(currentPage - 1)}
        >
          {"<"}
        </div>
        {Array(limit)
          .fill(0)
          .map((_, i) => {
            const page = offset * limit + (i + 1)
            if (page > totalPage) return null
            return (
              <div
                className={`w-8 h-8 border m-1 ${
                  page === currentPage + 1 && activeStyle
                } `}
                onClick={() => clickPage(page - 1)}
                key={i}
              >
                {page}
              </div>
            )
          })}
        <div
          className="w-8 h-8 border m-1 "
          onClick={() => clickPage(currentPage + 1)}
        >
          {">"}
        </div>
        <div
          className="w-8 h-8 border m-1 "
          onClick={() => clickPage(totalPage - 1)}
        >
          {">>"}
        </div>
      </div>
    </>
  )
}

export default Pagination
