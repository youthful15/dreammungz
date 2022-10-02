import { Link, NavLink } from "react-router-dom"

export interface TabProp {
  title: string
  path: string
}
const Tab = ({ title, path }: TabProp) => {
  return (
    <NavLink to={path} className="">
      {({ isActive }) => (
        <div
          className={`h-[90%] p-2  rounded-t-lg w-[100px]  text-center mapleStory border-r-2 border-beige-600/40  text-brown  ${
            isActive ? "bg-pink" : "bg-beige-500"
          }`}
        >
          {title}
        </div>
      )}
    </NavLink>
  )
}

export default Tab
