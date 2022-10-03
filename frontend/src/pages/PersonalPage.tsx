import { Link, Outlet, useParams } from "react-router-dom"
import TabList from "../components/tab/TabList"
import UserInfo from "../components/userInfo/UserInfo"

const personalMenu = [
  { title: "보유 NFT", path: "list" },
  { title: "거래 내역 ", path: "history" },
  { title: "오퍼 내역 ", path: "offer" },
  { title: "업적", path: "achievement" },
]

const PersonalPage = () => {
  const { address } = useParams()
  if (address === "null") {
    console.log(address)
    return <div> 해당 유저가 존재하지 않습니다. </div>
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full  h-[10%]  mb-4 flex items-end   justify-between  border-b-4 border-beige-500">
        <TabList list={personalMenu} />
        <UserInfo />
      </div>
      <div className="w-full  h-[90%]">
        <Outlet />
      </div>
    </div>
  )
}

export default PersonalPage
