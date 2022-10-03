import React, { useState, useEffect } from "react"
import { useNavigate, Navigate, useParams } from "react-router-dom"
import findKOR from "../../utils/findKOR"
import Tier from "../nftInfo/Tier"
import Gender from "../nftInfo/Gender"
import StatList from "../nftInfo/StatList"
import NftGenderExplain from "./NftGenderExpain"
import tooltipAtom from "../../recoil/tooltip/atom"
import { useRecoilState } from "recoil"
import NftAbilityExplain from "./NftAbilityExplain"

export default function NftMainDetail(info: any) {
  const { id } = useParams()
  const navigate = useNavigate()
  const goPersonalList = async (address: string) => {
    navigate(`/personal/${address}/list`)
  }
  const [tool, setTool] = useRecoilState(tooltipAtom)

  return (
    <div className="text-xl font-semibold">
      <p className="text-4xl mb-1">멍개 #{id}</p>

      <div className="flex">
        <p className="mr-1">직업: </p>
        <p>{findKOR(info.info.nft.job)}</p>
      </div>

      {/* 성별 설명창 */}

      <div className="flex">
        <p
          className="mr-1 cursor-default"
          onMouseEnter={() =>
            setTool((prev) => {
              const variable = { ...prev }
              variable.genderExplainShow = true
              return { ...variable }
            })
          }
        >
          성별:
        </p>
        {tool.genderExplainShow ? <NftGenderExplain /> : null}
        <Gender gender={info.info.nft.gender} />
      </div>

      <p
        className="my-1"
        onMouseEnter={() =>
          setTool((prev) => {
            const variable = { ...prev }
            variable.abilityExplainShow = true
            return { ...variable }
          })
        }
      >
        능력치
      </p>
      {tool.abilityExplainShow ? <NftAbilityExplain /> : null}
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

      <div className="flex">
        <p className="mr-1">등급: </p>
        <Tier tier={info.info.nft.tier} />
        {/* {findKOR(info.info.nft.tier)} */}
      </div>

      {info.info.sell === true ? (
        <div>
          <div className="flex">
            <p className="mr-1">분양자:</p>
            <p
              className="cursor-pointer hover:text-lgBrown-500"
              onClick={() => goPersonalList(info.info.sellerAddress)}
            >
              {info.info.sellerNickname}
            </p>
          </div>
          <p>{info.info.price} M</p>
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
