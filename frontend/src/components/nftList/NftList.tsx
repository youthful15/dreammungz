import { useSetRecoilState } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import Pagination from "../pagination/Pagination"
import NftListItem, { NftListItemType } from "./NftListItem"

interface NftListProp {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  list: NftListItemType[]
  totalPage: number
}

const NftList = ({ page, setPage, totalPage, list }: NftListProp) => {
  const setShowInfo = useSetRecoilState(listModeAtom)

  return (
    <div className="relative w-full h-full text-center ">
      <div className="mb-1 space-x-2 h-[5%]">
        <button
          className="p-1 px-2 rounded-lg bg-brown-200"
          onClick={() => setShowInfo(false)}
        >
          이미지만 보기{" "}
        </button>
        <button
          className="p-1 px-2 rounded-lg bg-brown-200"
          onClick={() => setShowInfo(true)}
        >
          정보와 함께 보기{" "}
        </button>
      </div>

      <div className="h-[85%] ">
        <div className="flex flex-wrap h-full">
          {list.map((item, idx) => {
            return <NftListItem item={item} key={item.id} />
          })}
        </div>
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
      </div>
    </div>
  )
}

export default NftList
