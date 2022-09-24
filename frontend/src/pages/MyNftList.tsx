import { useState, useEffect, ChangeEvent } from "react"
import NftList from "../components/nftList/NftList"
import Filter from "../components/filter/Filter"
import useQueryParam from "../components/filter/useQueryParam"

const MyNftList = (props: any) => {
  return (
    <div className="relative h-full ">
      <NftList useFilter={false} />
    </div>
  )
}

export default MyNftList
