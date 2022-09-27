import { Link, Outlet, useParams } from "react-router-dom"
import TabList from "../components/tab/TabList"
import UserInfo from "../components/userInfo/UserInfo"

const personalMenu = [
  { title: "내 NFT 목록", path: "list" },
  { title: "거래 내역 ", path: "history" },
]

const PersonalPage = () => {
  const { address } = useParams()
  if (address === "null") {
    console.log(address)
    return <div> 해당 유저가 존재하지 않습니다. </div>
  }

  return (
    <div className="w-full h-full">
      <div className="w-full  h-[10%]  mb-3  flex items-center ">
        <UserInfo />
        <TabList list={personalMenu} />
      </div>
      <div className="w-full  h-[90%]">
        <Outlet />
      </div>
    </div>
  )
}

export default PersonalPage
