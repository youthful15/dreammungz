import { useRecoilValue } from "recoil"
import listModeAtom from "../../recoil/list/atom"

interface NftListItemProp {
  img: string
  info?: JSX.Element | null
  status?: JSX.Element | null
}

const NftListItem = ({ img, info, status }: NftListItemProp) => {
  const showInfo = useRecoilValue(listModeAtom)
  return (
    <div className={`relative  p-2 rounded-lg bg-4   w-[25%]  h-1/2 `}>
      <div
        className={`w-full  flex items-center justify-center flex-col border-2 h-full  rounded-lg ${
          showInfo && "bg-white"
        }`}
      >
        <div className="flex   border-2">
          <img
            className={` rounded-lg   ${
              showInfo ? "w-[140px] h-[140px]" : "w-[200px] h-[200px]"
            }`}
            src={img}
          />
          {showInfo && <div className="bottom-0 right-2">{info}</div>}
        </div>

        {showInfo && (
          <div className="border-2">
            <div className=" ">{status} </div>
            <div>가격 : 900 M</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NftListItem
