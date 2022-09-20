import { Link, Outlet } from "react-router-dom"
import TabList from "../components/tab/TabList"
import TabPanel from "../components/tab/TabPanel"
import UserInfo from "../components/userInfo/UserInfo"

const menu = [
  { title: "내 NFT 목록", path: "/mypage/list" },
  { title: "거래 내역 ", path: "/mypage/history" },
]

const MyPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-full ">
      <div className="w-full  h-[5%]  mb-2">
        <UserInfo />
      </div>
      <div className="w-full ">
        <div className="h-8 border-b-2 border-beige">
          <TabList list={menu} />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MyPage
