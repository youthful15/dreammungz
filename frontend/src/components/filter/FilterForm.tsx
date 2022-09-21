import React, { ChangeEvent, useState } from "react"
import {
  job_list,
  hair_list,
  tier_list,
  color_list,
  face_list,
  gender_list,
  stat_list,
} from "../../utils/gameWord"

type filterFormProp = {
  formHandler: (event: ChangeEvent<HTMLFormElement>) => void
}
const FilterForm = ({ formHandler }: filterFormProp) => {
  return (
    <div className="bg-white absolute z-10">
      필터옵션
      <form onChange={formHandler}>
        <p>판매중인것만 보기</p>
        <label>
          <input type="checkbox" name="sell" />
        </label>
        <p>직업</p>
        {job_list.map((item) => {
          return (
            <label key={item.eng}>
              <input type="radio" name="job" value={item.eng} />
              {item.kor}
            </label>
          )
        })}
        <p>모질</p>
        {hair_list.map((item) => {
          return (
            <label key={item.eng}>
              <input type="radio" name="hair" value={item.eng} />
              {item.kor}
            </label>
          )
        })}
        <p>티어</p>
        {tier_list.map((item) => {
          return (
            <label key={item.eng}>
              <input type="radio" name="tier" value={item.eng} />
              {item.kor}
            </label>
          )
        })}
        <p>성별</p>
        {gender_list.map((item) => {
          return (
            <label key={item.eng}>
              <input type="radio" name="gender" value={item.eng} />
              {item.kor}
            </label>
          )
        })}
        <p>색상</p>
        {color_list.map((item) => {
          return (
            <label key={item.eng}>
              <input type="radio" name="color" value={item.eng} />
              {item.kor}
            </label>
          )
        })}
        <p>얼굴</p>
        {face_list.map((item) => {
          return (
            <label key={item.eng}>
              <input type="radio" name="face" value={item.eng} />
              {item.kor}
            </label>
          )
        })}
        <p>능력 </p>
        {stat_list.map((item) => {
          return (
            <label key={item.eng}>
              <input type="checkbox" name="status" value={item.eng} />
              {item.kor}
            </label>
          )
        })}
      </form>
    </div>
  )
}

export default FilterForm
