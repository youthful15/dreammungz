import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAnglesLeft,
  faAnglesRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons"

const totalPage = 182
const limit = 10

const buttonColor = "bg-beige-500"
const activeColor = "bg-pink-500"

const buttonStyle =
  "w-8 h-8 m-1  rounded-full  text-center pt-0.5 text-brown cursor-pointer "

interface PaginationProp {
  totalPage?: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({
  page: currentPage,
  setPage: setCurrentPage,
}: PaginationProp) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const tmpOffset = Math.floor(currentPage / limit)

    if (tmpOffset !== offset) setOffset(tmpOffset)
  }, [currentPage])

  const clickPage = (num: number) => {
    if (num + 1 > totalPage || num + 1 <= 0) return
    setCurrentPage(num)
  }

  return (
    <>
      {/* <div>페이지 인덱스:{currentPage}</div>
      <div>페이지 오프셋:{offset}</div> */}
      <div className="absolute bottom-0 flex justify-center w-full">
        <div
          className={`${buttonStyle} ${buttonColor}`}
          onClick={() => clickPage(0)}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </div>
        <div
          className={`${buttonStyle} ${buttonColor}`}
          onClick={() => clickPage(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        {Array(limit)
          .fill(0)
          .map((_, i) => {
            const page = offset * limit + (i + 1)
            if (page > totalPage) return null
            return (
              <div
                className={`  ${`${buttonStyle} `}  ${
                  page === currentPage + 1 ? activeColor : buttonColor
                } `}
                onClick={() => clickPage(page - 1)}
                key={i}
              >
                {page}
              </div>
            )
          })}
        <div
          className={`${buttonStyle} ${buttonColor}`}
          onClick={() => clickPage(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
        <div
          className={`${buttonStyle} ${buttonColor}`}
          onClick={() => clickPage(totalPage - 1)}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </div>
      </div>
    </>
  )
}

export default Pagination
