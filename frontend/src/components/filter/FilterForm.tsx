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
import Filter from "./Filter"

const listStyle = "w-1/2 p-1 text-sm "
const labelStyle =
  "p-0.5  border border-gray-700 rounded-md bg-beige-300 peer-checked:bg-blue-300 w-full inline-block"
const titleStyle = "p-1 font-bold   m-0.5 border-b-2 border-beige-100"
type filterFormProp = {
  formHandler: (event: ChangeEvent<HTMLFormElement>) => void
  filter: Filter
}
const FilterForm = ({ formHandler, filter }: filterFormProp) => {
  return (
    <div className="h-[700px] w-[230px] bg-brown-200  overflow-y-auto scrollbar-hide rounded-l-xl absolute left-[7px] z-10 top-[7px] p-1">
      <form onChange={formHandler} className="w-full text-center ">
        <p className={titleStyle}>직업</p>
        <ul className="flex flex-wrap w-full">
          {job_list.map((item) => {
            return (
              <li key={item.eng} className={listStyle}>
                <input
                  type="radio"
                  name="job"
                  id={item.eng}
                  value={item.eng}
                  className="hidden peer"
                  defaultChecked={filter?.job === item.eng}
                />
                <label htmlFor={item.eng} className={labelStyle}>
                  {item.kor}
                </label>
              </li>
            )
          })}
        </ul>
        <p className={titleStyle}>모질</p>
        <ul className="flex">
          {hair_list.map((item) => {
            return (
              <li key={item.eng} className={listStyle}>
                <input
                  type="radio"
                  name="hair"
                  id={item.eng}
                  value={item.eng}
                  className="hidden peer"
                  defaultChecked={filter?.hair === item.eng}
                />
                <label htmlFor={item.eng} className={labelStyle}>
                  {item.kor}
                </label>
              </li>
            )
          })}
        </ul>
        <p className={titleStyle}>티어</p>
        <ul className="flex flex-wrap">
          {tier_list.map((item) => {
            return (
              <li key={item.eng} className={listStyle}>
                <input
                  type="radio"
                  name="tier"
                  id={item.eng}
                  value={item.eng}
                  className="hidden peer"
                  defaultChecked={filter?.tier === item.eng}
                />
                <label htmlFor={item.eng} className={labelStyle}>
                  {item.kor}
                </label>
              </li>
            )
          })}
        </ul>
        <p className={titleStyle}>성별</p>
        <ul className="flex flex-wrap">
          {gender_list.map((item) => {
            return (
              <li key={item.eng} className={listStyle}>
                <input
                  type="radio"
                  name="gender"
                  id={item.eng}
                  value={item.eng}
                  className="hidden peer"
                  defaultChecked={filter?.gender === item.eng}
                />
                <label htmlFor={item.eng} className={labelStyle}>
                  {item.kor}
                </label>
              </li>
            )
          })}
        </ul>
        <p className={titleStyle}>색상</p>
        <ul className="flex flex-wrap">
          {color_list.map((item) => {
            return (
              <li key={item.eng} className={listStyle}>
                <input
                  type="radio"
                  name="color"
                  id={item.eng}
                  value={item.eng}
                  className="hidden peer"
                  defaultChecked={filter?.color === item.eng}
                />
                <label htmlFor={item.eng} className={labelStyle}>
                  {item.kor}
                </label>
              </li>
            )
          })}
        </ul>
        <p className={titleStyle}>얼굴</p>
        <ul className="flex flex-wrap">
          {face_list.map((item) => {
            return (
              <li key={item.eng} className={listStyle}>
                <input
                  type="radio"
                  name="face"
                  id={item.eng}
                  value={item.eng}
                  className="hidden peer"
                  defaultChecked={filter?.face === item.eng}
                />
                <label htmlFor={item.eng} className={labelStyle}>
                  {item.kor}
                </label>
              </li>
            )
          })}
        </ul>
        <p className={titleStyle}>능력 </p>
        <ul className="flex flex-wrap">
          {stat_list.map((item) => {
            return (
              <li key={item.eng} className={listStyle}>
                <input
                  type="checkbox"
                  name="status"
                  id={item.eng}
                  value={item.eng}
                  className="hidden peer"
                  defaultChecked={filter?.status?.includes(item.eng)}
                />
                <label htmlFor={item.eng} className={labelStyle}>
                  {item.kor}
                </label>
              </li>
            )
          })}
        </ul>
      </form>
    </div>
  )
}

export default FilterForm
