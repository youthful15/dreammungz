import { useEffect, useState } from "react"
import { useParams } from "react-router"
import NftHistoryList from "../components/nftHistory/NftHistoryList"

const DealHistoryByUser = () => {
  const { address } = useParams()

  return (
    <div className="w-full h-[570px]">
      <h1 className="text-2xl font-semibold text-center"> NFT 거래 내역</h1>
      {address && <NftHistoryList address={address} />}
      {!address && (
        <div className="w-full h-full text-center leading-[500px]">
          거래 내역이 없습니다.
        </div>
      )}
    </div>
  )
}

export default DealHistoryByUser
