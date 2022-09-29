import React, { useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import findKOR from "../../utils/findKOR"
import Tier from "../nftInfo/Tier"
import Gender from "../nftInfo/Gender"
import StatList from "../nftInfo/StatList"

export default function NftMainDetail(info: any) {
  const navigate = useNavigate()
  const goPersonalList = async (address: string) => {
    navigate(`/personal/${address}/list`)
  }

  return (
    <div>
      <p className="text-xl font-semibold">
        직업: {findKOR(info.info.nft.job)}
      </p>
      <div className="flex text-xl font-semibold">
        <p className="mr-1">성별: </p>
        <Gender gender={info.info.nft.gender} />
        {findKOR(info.info.nft.gender)}
      </div>
      <p className="text-xl font-semibold">Tags</p>
      <div className="flex">
        {info.info.nft.status.map((res: any, index: number) => {
          let status: any = [
            {
              name: res.name,
              value: res.value,
            },
          ]
          return (
            <div key={index}>
              <StatList statList={status} />
            </div>
          )
        })}
      </div>
      <div className="flex text-xl font-semibold">
        <p className="mr-1">등급: </p>
        <Tier tier={info.info.nft.tier} />
        {findKOR(info.info.nft.tier)}
      </div>
      {info.info.sell === true ? (
        <div>
          <div className="flex text-xl font-semibold">
            <p className="mr-1">분양자:</p>
            <p
              className="cursor-pointer hover:text-lgBrown-500"
              onClick={() => goPersonalList(info.info.sellerAddress)}
            >
              {info.info.sellerNickname}
            </p>
          </div>
          <p className="text-xl font-semibold">{info.info.price} M</p>
        </div>
      ) : (
        <div>
          <div className="flex text-xl font-semibold">
            <p className="mr-1">보유자: </p>
            <p
              className="cursor-pointer hover:text-lgBrown-500"
              onClick={() => goPersonalList(info.info.sellerAddress)}
            >
              {info.info.sellerNickname}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
