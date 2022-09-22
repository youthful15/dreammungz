import { useNavigate } from "react-router"
import { useRecoilValue } from "recoil"
import listModeAtom from "../../recoil/list/atom"
import { StatType } from "../nftInfo/Stat"
import StatList from "../nftInfo/StatList"
import Tier from "../nftInfo/Tier"

const SellStatus = () => {
  return (
    <div className="text-white text-sm bg-rose-700 top-3 right-2 p-0.5 rounded-md m-0.5">
      <div>가격 : 900 M</div>
    </div>
  )
}

interface NftListItem {
  id: number
  url: string
  metadata: string
  job: string
  hair: string
  tier: string
  color: string
  gender: string
  face: string
  sell: boolean
  status: StatType[]
}

const NftListItem = ({ item }: { item: NftListItem }) => {
  const navigate = useNavigate()
  const showInfo = useRecoilValue(listModeAtom)
  const { id, url, tier, sell, status } = item

  return (
    <div
      className={`relative  p-2 rounded-lg bg-4   w-[25%]  h-1/2  hover:scale-110`}
      onClick={() => {
        navigate(`/nft/detail/${id}`)
      }}
    >
      <div
        className={`w-full  flex items-center justify-center flex-col  h-full  rounded-lg  bg-beige-400`}
      >
        <div className="flex ">
          <div className="relative">
            <img
              className={`   rounded-lg   ${
                showInfo ? "w-[140px] h-[140px]" : "w-[200px] h-[200px]"
              }`}
              src={url}
            />
            {showInfo && tier && (
              <div className="absolute bottom-0 right-0">
                <Tier tier={tier} />
              </div>
            )}
          </div>
          {showInfo && status && (
            <div className="bottom-0 right-2">
              <StatList statList={status} />
            </div>
          )}
        </div>

        {showInfo && (
          <div className="w-full pt-1 mt-2">
            {sell ? <SellStatus /> : <div>판매중이 아닙니다.</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default NftListItem
