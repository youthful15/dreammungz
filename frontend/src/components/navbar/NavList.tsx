import NavItem from "./NavItem"

const navItemList = [
  { title: "튜토리얼", path: "/tutorial" },
  { title: "강아지 구경", path: "/nft/list" },
  { title: "커뮤니티", path: "/community" },
  // { title: "메인페이지", path: "/mainpage" },
  { title: "디자인(개발용)", path: "/styles" },
]

interface NavListProp {
  navItemStyle: string
}

const NavList = ({ navItemStyle }: NavListProp) => {
  return (
    <ul>
      {navItemList.map((item, key) => (
        <NavItem
          title={item.title}
          path={item.path}
          key={key}
          navItemStyle={navItemStyle}
        />
      ))}
    </ul>
  )
}

export default NavList
