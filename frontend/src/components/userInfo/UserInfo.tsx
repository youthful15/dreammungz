import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router"
import { getUserNickname } from "../../api/auth"

const originNick = "천재지영!!"
const UserInfo = () => {
  const { address } = useParams()
  const [editing, setEditing] = useState(false)
  const { data } = useQuery(["nickname", address], () =>
    getUserNickname(address!)
  )

  return (
    <>
      {!editing ? (
        <div className="flex">
          <h1 className="text-2xl font-bold ">
            {data?.nickname}의 NFT 페이지{" "}
          </h1>
          <button
            className="p-1 ml-4 bg-white rounded-lg"
            onClick={() => {
              setEditing(true)
            }}
          >
            ✏️
          </button>
        </div>
      ) : (
        <div className="space-x-2">
          <input
            type="text"
            defaultValue={data?.nickname}
            onChange={(e) => {
              console.log("닉넴변경")
            }}
          />
          <button
            className="border"
            onClick={() => {
              setEditing(false)
            }}
          >
            수정 하기{" "}
          </button>
          <button
            className="border"
            onClick={() => {
              setEditing(false)
            }}
          >
            취소{" "}
          </button>
        </div>
      )}
    </>
  )
}

export default UserInfo
