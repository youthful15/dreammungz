import { Link } from "react-router-dom"

export interface TabProp {
  title: string
  path: string
}

const Tab = ({ title, path }: TabProp) => {
  return (
    <Link to={path} className="border-2 bg-orange-300">
      {title}
    </Link>
  )
}

export default Tab
