import { useSetRecoilState } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import Pagination from "../pagination/Pagination"
import NftListItem from "./NftListItem"

interface NftListProp {
  type: string | undefined
}

const Info = () => {
  return (
    <>
      <div className="text-black text-sm bg-green-300 top-3 right-2 p-0.5 rounded-md m-0.5">
        영리함 +2
      </div>
      <div className="text-white text-sm bg-blue-500 top-3 right-2 p-0.5 rounded-md m-0.5">
        용기 +1
      </div>
    </>
  )
}

const Status = () => {
  return (
    <span className="text-white text-sm bg-rose-700 top-3 right-2 p-0.5 rounded-md m-0.5">
      구매가능
    </span>
  )
}

const NftList = ({ ...props }) => {
  const { type, grid } = props
  const setShowInfo = useSetRecoilState(listModeAtom)

  return (
    <div className="w-full h-full py-3">
      <div className="space-x-2">
        <button className="border-4" onClick={() => setShowInfo(false)}>
          이미지만 보기{" "}
        </button>
        <button className="border-4" onClick={() => setShowInfo(true)}>
          정보와 함께 보기{" "}
        </button>
      </div>

      <div className="grid grid-cols-4 px-6 mb-2 gap-x-3">
        {Array(8)
          .fill(0)
          .map((_, idx) => {
            return (
              <NftListItem
                img="/기자멍.png"
                info={<Info />}
                status={<Status />}
                key={idx}
              />
            )
          })}
      </div>
      <Pagination />
    </div>
  )
}

export default NftList
