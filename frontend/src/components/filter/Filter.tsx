import React, { ChangeEvent, useState } from "react"
import { NavigateOptions, useNavigate } from "react-router-dom"
import findKOR from "../../utils/findKOR"
import FilterForm from "./FilterForm"

interface Filter {
  job: string | null
  hair: string | null
  tier: string | null
  color: string | null
  gender: string | null
  face: string | null
  sell: boolean
  status: string[]
  page: number
  address: string | null
}

const buttonStyle = "p-1 m-0.5 border border-gray-700 rounded-md  h-8"
const SelectedFilters = ({
  filter,
  resetFilter,
}: {
  filter: Filter
  resetFilter: () => void
}) => {
  const selected: string[] = Object.values(filter)
    .filter(
      (val) =>
        typeof val !== "boolean" && val !== null && typeof val !== "number"
    )
    .flat()

  // console.log(selected)

  return (
    <div className="flex overflow-x-auto">
      {selected.map((value) => {
        return <div className={buttonStyle}>{findKOR(value)}</div>
      })}

      {selected.length !== 0 && (
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

interface FilterProp {
  filter: Filter
  setFilter: (newQuery: Filter, options?: NavigateOptions | undefined) => void
}
const Filter = ({ filter: origin, setFilter }: FilterProp) => {
  const [showForm, setShowForm] = useState(false)

  const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {
    let form = event.currentTarget
    let formData = new FormData(form)

    let filter: Filter = {
      job: formData.get("job") as string,
      hair: formData.get("hair") as string,
      tier: formData.get("tier") as string,
      color: formData.get("color") as string,
      gender: formData.get("gender") as string,
      face: formData.get("face") as string,
      sell: origin.sell,
      status: formData.getAll("status") as string[],
      page: 0,
      address: null,
    }
    console.log(JSON.stringify(filter))
    setFilter(filter, { replace: false })
  }

  const resetFilter = () => {
    setFilter({
      job: null,
      hair: null,
      tier: null,
      color: null,
      gender: null,
      face: null,
      sell: origin.sell,
      status: [],
      page: 0,
      address: null,
    })
    setShowForm(false)
  }

  return (
    <div className="">
      <div className="flex ">
        <button
          className={`${buttonStyle} ${
            showForm ? "bg-blue-300" : "bg-white"
          } absolute top-[145px] left-[270px] z-10`}
          onClick={() => {
            setShowForm((curState) => !curState)
          }}
        >
          {showForm ? "필터 닫기" : "필터 열기 "}
        </button>
        <SelectedFilters filter={origin} resetFilter={resetFilter} />
      </div>
      {showForm && (
        <FilterForm formHandler={handleFormChange} filter={origin} />
      )}
    </div>
  )
}

export default Filter
