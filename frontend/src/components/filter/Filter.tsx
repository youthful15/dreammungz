import React, { ChangeEvent, useState } from "react"
import type { NavigateOptions } from "react-router-dom"

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
      address: null,
    }
    console.log(JSON.stringify(filter))
    setFilter(filter, { replace: false })
  }

  return (
    <div className="relative bg-gray-300">
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
