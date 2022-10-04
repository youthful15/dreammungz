import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
    if (newNickname === "") {
      alert("닉네임은 최소 1자 이상이어야 합니다.")
    }
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
          <h1 className="pb-2 text-3xl font-bold mapleStory text-lgBrown-700">
            {data?.nickname}
          </h1>
          {isOwner !== null && isOwner && (
            <button
              className="p-1 mx-2 rounded-lg"
              onClick={() => {
                setEditing(true)
              }}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-lgBrown-700"
              />
            </button>
          )}
        </div>
      ) : (
        <div className="pb-2 ml-1 mr-2 space-x-2 mapleStory">
          <input
            type="text"
            defaultValue={data?.nickname}
            onChange={onNicknameChange}
            className="p-1 border-2 rounded-lg border-lgBrown-400 "
          />
          <button
            className="p-1 border-2 rounded-lg bg-sky-200 border-lgBrown-400"
            onClick={onNicknameSubmit}
          >
            수정 하기{" "}
          </button>
          <button
            className="p-1 mr-2 border-2 rounded-lg bg-rose-200 border-lgBrown-400"
            onClick={() => {
              setEditing(false)
            }}
          >
            수정 취소{" "}
          </button>
        </div>
      )}
    </>
  )
}

export default UserInfo
