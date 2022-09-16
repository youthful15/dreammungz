import { NavLink } from "react-router-dom"

export interface NavItemProp {
  title: string
  path: string
  navItemStyle: string
}

const NavItem = ({ title, path, navItemStyle }: NavItemProp) => {
  return (
    <NavLink to={path}>
      <li className={navItemStyle}>{title}</li>
    </NavLink>
  )
}

export default NavItem
