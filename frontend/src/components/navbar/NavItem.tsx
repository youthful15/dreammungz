import { NavLink } from "react-router-dom"

export interface NavItemProp {
  title: string
  path: string
}

const NavItem = ({ title, path }: NavItemProp) => {
  return (
    <li className="my-2 border-brown-200 text-brown">
      <NavLink to={path}>
        {({ isActive }) => (
          <div
            className={
              isActive
                ? `bg-pink-500  border rounded-lg shadow-sm p-1`
                : "bg-beige-500  border rounded-lg shadow-sm p-1"
            }
          >
            {title}
          </div>
        )}
        {/* {title} */}
      </NavLink>
    </li>
  )
}

export default NavItem
// className={({ isActive }) => (isActive ? "bg-blue-500" : undefined)}
