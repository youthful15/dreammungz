import { NavLink } from "react-router-dom"

export interface NavItemProp {
  title: string
  path: string
}

const NavItem = ({ title, path }: NavItemProp) => {
  return (
    <NavLink to={path}>
      <li className="border  my-2  bg-gray-200">{title}</li>
    </NavLink>
  )
}

export default NavItem
