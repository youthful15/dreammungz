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
import NftJobExpain from "./NftJobExplain"
import NftGradeExpain from "./NftGradeExplain"

export default function NftMainDetail(info: any) {
  const { id } = useParams()
  const navigate = useNavigate()
  const goPersonalList = async (address: string) => {
    navigate(`/personal/${address}/list`)
  }
  const [tool, setTool] = useRecoilState(tooltipAtom)

  return (
    <div className="text-xl">
      <p className="text-4xl mb-6">멍개 #{id}</p>

      <div className="flex mb-2">
        <div className="flex mr-[100px]">
          <p
            className="mr-[30px] cursor-default text-md"
            onMouseEnter={() => {
              setTool((prev) => {
                const variable = { ...prev }
                variable.jobExplainShow = true
                return { ...variable }
              })
            }}
            onMouseLeave={() => {
              setTool((prev) => {
                const variable = { ...prev }
                variable.jobExplainShow = false
                return { ...variable }
              })
            }}
          >
            직업
          </p>
          <p className="font-semibold">{findKOR(info.info.nft.job)}</p>
        </div>

        <div className="flex">
          <p
            className="cursor-default mr-[30px]"
            onMouseEnter={() =>
              setTool((prev) => {
                const variable = { ...prev }
                variable.genderExplainShow = true
                return { ...variable }
              })
            }
            onMouseLeave={() => {
              setTool((prev) => {
                const variable = { ...prev }
                variable.genderExplainShow = false
                return { ...variable }
              })
            }}
          >
            성별
          </p>
          <Gender gender={info.info.nft.gender} />
        </div>
      </div>

      {/* 직업 설명창 */}
      {tool.jobExplainShow ? <NftJobExpain /> : null}

      {/* 성별 설명창 */}
      {tool.genderExplainShow ? <NftGenderExplain /> : null}

      <div className="flex mb-2">
        <p
          className="mr-[10px] cursor-default"
          onMouseEnter={() =>
            setTool((prev) => {
              const variable = { ...prev }
              variable.abilityExplainShow = true
              return { ...variable }
            })
          }
          onMouseLeave={() => {
            setTool((prev) => {
              const variable = { ...prev }
              variable.abilityExplainShow = false
              return { ...variable }
            })
          }}
        >
          능력치
        </p>

        <div className="flex flex-wrap w-[510px] h-[40px] mb-2">
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
      </div>

      {/* 능력치 설명창 */}
      {tool.abilityExplainShow ? <NftAbilityExplain /> : null}

      <div className="flex mb-2">
        <p
          className="cursor-default mr-[30px]"
          onMouseEnter={() => {
            setTool((prev) => {
              const variable = { ...prev }
              variable.gradeExplainShow = true
              return { ...variable }
            })
          }}
          onMouseLeave={() => {
            setTool((prev) => {
              const variable = { ...prev }
              variable.gradeExplainShow = false
              return { ...variable }
            })
          }}
        >
          등급
        </p>
        <Tier tier={info.info.nft.tier} />
      </div>

      {/* 등급 설명창 */}
      {tool.gradeExplainShow ? <NftGradeExpain /> : null}

      {info.info.sell === true ? (
        <div>
          <div className="flex mb-2">
            <p className="mr-3 cursor-default">분양자</p>
            <p
              className="cursor-pointer hover:text-lgBrown-500 font-semibold"
              onClick={() => goPersonalList(info.info.sellerAddress)}
            >
              {info.info.sellerNickname}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <p className="mr-[26px]">가격</p>
              <p className="font-semibold">{info.info.price} M</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex mb-2">
            <p className="mr-3 cursor-default">보유자</p>
            <p
              className="cursor-pointer hover:text-lgBrown-500 font-semibold"
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
