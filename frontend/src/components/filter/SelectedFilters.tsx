import Filter from "./Filter"
import { NavigateOptions, useNavigate } from "react-router-dom"
import findKOR from "../../utils/findKOR"
import { getKey } from "../../utils/gameWord"
import { useEffect } from "react"

const buttonStyle = "p-1 m-0.5 border border-gray-700 rounded-md  h-8"
const SelectedFilters = ({
  filter,
  resetFilter,
  setFilter,
  setSelectedList,
  seletedList,
}: {
  filter: Filter
  resetFilter: () => void
  setFilter: (newQuery: Filter, options?: NavigateOptions | undefined) => void
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
  seletedList: string[]
}) => {
  useEffect(() => {
    const selected: string[] = Object.values(filter)
      .filter(
        (val) =>
          typeof val !== "boolean" && val !== null && typeof val !== "number"
      )
      .flat()

    setSelectedList(selected)
  }, [filter])

  const onClickHandler = (option: string) => {
    const key = getKey[option]

    if (key === "status") {
      let status = filter.status
      let statusIndex = status.findIndex((stat) => stat === option)
      status.splice(statusIndex, 1)
      console.log(statusIndex, status)
      setFilter({ ...filter, status: status })
    } else {
      setFilter({ ...filter, [key]: null })
    }
  }

  return (
    <div className="flex flex-wrap overflow-x-auto">
      {seletedList.map((value) => {
        return (
          <div className={buttonStyle} key={value}>
            {findKOR(value)}
            <span
              className="text-base font-medium p-0.5  bg-beige-500  ml-1 rounded-lg"
              onClick={() => {
                onClickHandler(value)
              }}
            >
              X
            </span>
          </div>
        )
      })}

      {seletedList.length !== 0 && (
        <button
          className={`${buttonStyle} bg-white`}
          onClick={() => {
            resetFilter()
          }}
        >
          필터 초기화
        </button>
      )}
    </div>
  )
}

export default SelectedFilters
