import { Link, Outlet } from "react-router-dom"
import TabList from "../components/Tab/TabList"
import TabPanel from "../components/Tab/TabPanel"

const menu = [
  { title: "내 NFT 목록", path: "/mypage/list" },
  { title: "거래 내역 ", path: "/mypage/history" },
]

const MyPage = () => {
  return (
    <div>
      여기는 마이페이지
      <TabList list={menu} />
      <TabPanel>
        <Outlet />
      </TabPanel>
    </div>
  )
}

export default MyPage
