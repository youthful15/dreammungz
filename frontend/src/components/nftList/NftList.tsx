import { useState } from "react"
import Pagination from "../pagination/Pagination"
import NftListItem from "./NftListItem"

interface NftListProp {
  type: string | undefined
}

const Info = () => {
  return <div>NFT 정보 컴포넌트 </div>
}

const Status = () => {
  return <div>NFT 상태 </div>
}

const NftList = ({ ...props }) => {
  const { type, grid } = props
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <div className="space-x-2">
        <button className="border-4" onClick={() => setShowInfo(false)}>
          이미지만 보기{" "}
        </button>
        <button className="border-4" onClick={() => setShowInfo(true)}>
          정보와 함께 보기{" "}
        </button>
      </div>

      <div className="grid  grid-cols-5">
        {tmp?.map((data, idx) => {
          const ItemComponent = showInfo ? (
            <NftListItem
              img="path"
              info={<Info />}
              status={<Status />}
              key={idx}
            />
          ) : (
            <NftListItem img="path" key={idx} />
          )

          return ItemComponent
        })}
      </div>
      <Pagination />
    </>
  )
}

const tmp = [
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
  "임시",
]

export default NftList
