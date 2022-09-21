import { useSetRecoilState } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import StatList from "../nftInfo/StatList"
import Pagination from "../pagination/Pagination"
import NftListItem from "./NftListItem"

const nft = {
  id: 2,

  job: "VOCALIST",
  hair: "ORIGINAL",
  tier: "RARE",
  color: "BLACK",
  gender: "M",
  face: "SHY",
  sell: "Y",
  status: [
    {
      name: "CUTE",
      value: 100,
    },
    {
      name: "VOICE",
      value: 2,
    },
    {
      name: "SENSIBILITY",
      value: 100,
    },
    {
      name: "FOOTWORK",
      value: 2,
    },
  ],
  url: "/기자멍.png",
}

interface NftListProp {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
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
              const statList = <StatList statList={nft.status} />
              return (
                <NftListItem
                  img="/기자멍.png"
                  info={statList}
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
