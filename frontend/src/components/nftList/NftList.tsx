import { useSetRecoilState } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import Pagination from "../pagination/Pagination"
import NftListItem from "./NftListItem"
import nft_lst from "../../utils/tmpNftList"

interface NftListProp {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const NftList = ({ page, setPage }: NftListProp) => {
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
          {nft_lst.items.map((item, idx) => {
            return <NftListItem item={item} />
          })}
        </div>
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  )
}

export default NftList
