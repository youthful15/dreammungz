import { Link, Outlet } from "react-router-dom"
import TabList from "../components/tab/TabList"
import TabPanel from "../components/tab/TabPanel"

const menu = [
  { title: "내 NFT 목록", path: "/mypage/list" },
  { title: "거래 내역 ", path: "/mypage/history" },
]

const MyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div>마이페이지</div>
      <div className="w-[90%] h-[80%] ">
        <TabList list={menu} />
        <TabPanel>
          <Outlet />
        </TabPanel>
      </div>
    </div>
  )
}

export default MyPage
