import { info } from "console"
import NftListItem from "./NftListItem"

interface NftListProp {
  type: string
}

const Info = () => {
  return <div>NFT 정보 컴포넌트 </div>
}

const Status = () => {
  return <div>NFT 상태 </div>
}

const NftList = ({ type }: NftListProp) => {
  return (
    <div>
      {tmp?.map((item) => (
        <NftListItem img="path" info={<Info />} status={<Status />} />
      ))}
    </div>
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
