import { Link, NavLink } from "react-router-dom"

export interface TabProp {
  title: string
  path: string
}
const tabStyle = "h-full p-2  rounded-t-lg "
const Tab = ({ title, path }: TabProp) => {
  return (
    <NavLink to={path} className="">
      {({ isActive }) => (
        <div
          className={
            isActive ? tabStyle + "bg-beige" : tabStyle + "bg-gray-100"
          }
        >
          {title}
        </div>
      )}
    </NavLink>
  )
}

export default Tab
