import React, { ChangeEvent, useState } from "react"
import FilterForm from "./FilterForm"
const Filter = () => {
  const [showForm, setShowForm] = useState(false)

  const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {}

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
