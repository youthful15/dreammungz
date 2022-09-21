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
      <div className="w-full  h-[15%]   flex flex-col justify-end bg-white">
        <UserInfo />
        <div className="  border-beige">
          <TabList list={menu} />
        </div>
      </div>
      <div className="w-full h-[85%] ">
        {/* <div className=" bg-green-100 h-[580px]"> */}
        <Outlet />
        {/* </div> */}
      </div>
    </div>
  )
}

export default MyPage
