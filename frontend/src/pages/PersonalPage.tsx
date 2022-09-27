import { Link, Outlet } from "react-router-dom"
import TabList from "../components/tab/TabList"
import TabPanel from "../components/tab/TabPanel"
import UserInfo from "../components/userInfo/UserInfo"

const menu = [
  { title: "내 NFT 목록", path: "/mypage/list" },
  { title: "거래 내역 ", path: "/mypage/history" },
]

const personalMenu = [
  { title: "내 NFT 목록", path: "list" },
  { title: "거래 내역 ", path: "history" },
]

const PersonalPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full  h-[10%]  mb-3  flex items-center ">
        <UserInfo />
        <TabList list={personalMenu} />
      </div>
      <div className="w-full  h-[90%]">
        <Outlet />
        {/* <div className=" bg-green-100 h-[580px]"> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default PersonalPage
