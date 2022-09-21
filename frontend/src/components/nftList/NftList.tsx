import { useSetRecoilState } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import Pagination from "../pagination/Pagination"
import NftListItem from "./NftListItem"

interface NftListProp {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
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
      <div className="text-black text-sm bg-green-300 top-3 right-2 p-0.5 rounded-md m-0.5">
        카리스마 +2
      </div>
      <div className="text-black text-sm bg-green-300 top-3 right-2 p-0.5 rounded-md m-0.5">
        정의로움 +2
      </div>
      <div className="text-black text-sm bg-green-300 top-3 right-2 p-0.5 rounded-md m-0.5">
        감수성 +2
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

const NftList = ({ page, setPage }: NftListProp) => {
  const setShowInfo = useSetRecoilState(listModeAtom)

  return (
    <div className="w-full h-full text-center relative ">
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
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  )
}

export default NftList
