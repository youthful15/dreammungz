import { useState } from "react"
import Filter from "../components/filter/Filter"
import NftList from "../components/nftList/NftList"

const NftListPage = () => {
  return (
    <div>
      <Filter />
      <NftList type="test" />
    </div>
  )
}

export default NftListPage
