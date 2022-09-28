import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getUserNickname } from "../../api/auth"
import { http } from "../../api/axios"

const UserInfo = () => {
  const { address } = useParams()
  const [newNickname, setNewNickname] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [changedNick, setChangedNick] = useState<string | null>(null)
  const [isOwner, setIsOwner] = useState<boolean | null>(null)
  const { data, error } = useQuery(["nickname", address, changedNick], () =>
    getUserNickname(address!)
  )
  if (error) {
    console.log(error)
  }

  useEffect(() => {
    if (address) {
      if (address === localStorage.getItem("publicAddress")) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    }
  }, [address])

  const onNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewNickname(value)
  }

  const onNicknameSubmit = async () => {
    if (!address) return
    try {
      const data = await http.put(`auth/info/nickname`, {
        address,
        nickname: newNickname,
      })
      if (data.status === 200) {
        setChangedNick(newNickname)
      }
    } catch (e: any) {
      const { data } = e.response
      alert(`닉네임 수정 오류. ${data?.code} ${data?.message}`)
    }
  }
  useEffect(() => {
    if (changedNick) {
      setEditing(false)
    }
  }, [changedNick])

  return (
    <>
      {!editing ? (
        <div className="flex">
          <h1 className="text-2xl font-bold ">
            {data?.nickname}의 NFT 페이지{" "}
          </h1>
          {isOwner !== null && isOwner && (
            <button
              className="p-1 ml-4 bg-white rounded-lg"
              onClick={() => {
                setEditing(true)
              }}
            >
              ✏️
            </button>
          )}
        </div>
      ) : (
        <div className="space-x-2">
          <input
            type="text"
            defaultValue={data?.nickname}
            onChange={onNicknameChange}
          />
          <button className="border" onClick={onNicknameSubmit}>
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
