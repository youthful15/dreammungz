import React, { ChangeEvent, useState } from "react"
import type { NavigateOptions } from "react-router-dom"

import FilterForm from "./FilterForm"

interface Filter {
  job: string
  hair: string
  tier: string
  color: string
  gender: string
  face: string
  sell: boolean
  status: string[]
  page: number
}

interface FilterProp {
  setFilter: (newQuery: Filter, options?: NavigateOptions | undefined) => void
}
const Filter = ({ setFilter }: FilterProp) => {
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
      sell: formData.get("sell") === "on",
      status: formData.getAll("status") as string[],
      page: 0,
    }
    console.log(filter)
    setFilter(filter, { replace: false })
  }

  return (
    <div className="bg-gray-300 relative">
      <div>필터영역</div>
      <button
        className="bg-blue-300"
        onClick={() => {
          setShowForm((curState) => !curState)
        }}
      >
        {showForm ? "선택창 닫기" : "선택창 열기 "}
      </button>
      {showForm && <FilterForm formHandler={handleFormChange} />}
    </div>
  )
}

export default Filter
