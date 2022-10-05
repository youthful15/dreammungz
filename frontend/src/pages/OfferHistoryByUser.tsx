import { useEffect, useState } from "react"
import { useParams } from "react-router"
import NftOfferHistoryList from "../components/nftHistory/NftOfferHistoryList"

const OfferHistoryByUser = () => {
  const { address } = useParams()

  return (
    <div className="w-full h-[570px] pb-1 mapleStory">
      <h1 className="text-2xl font-semibold text-center"> NFT 오퍼 내역</h1>
      {address && <NftOfferHistoryList address={address} />}
      {!address && (
        <div className="w-full h-full text-center leading-[500px]">
          오퍼 내역이 없습니다.
        </div>
      )}
    </div>
  )
}

export default OfferHistoryByUser
