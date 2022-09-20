import { useState } from "react"

const originNick = "천재지영!!"
const UserInfo = () => {
  const [editing, setEditing] = useState(false)
  const [nickname, setNickname] = useState("천재지영!!")
  return (
    <>
      {!editing ? (
        <div className="flex">
          <h1 className="text-2xl font-bold ">{nickname}</h1>
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
            defaultValue={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
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
              setNickname(originNick)
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
