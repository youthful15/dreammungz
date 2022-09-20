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
    <div className={`relative my-1 bg-white border rounded-lg `}>
      <div className="flex">
        <img
          className={` rounded-lg   ${showInfo ? "w-[150px]" : "w-full "}`}
          src={img}
        />
        {showInfo && <div className="bottom-0 right-2">{info}</div>}
      </div>

      {showInfo && (
        <div>
          <div className=" top-3 right-2">{status} </div>
          <div>가격 : 900 M</div>
        </div>
      )}
    </div>
  )
}

export default NftListItem
