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
    <div className={`relative my-1 bg-white border rounded-lg max-w-[250px] `}>
      <img className={` rounded-lg shadow-md shadow-brown-300`} src={img} />

      {showInfo && (
        <div>
          <div className="absolute bottom-0 right-2">{info}</div>
          <div className="absolute top-3 right-2 ">{status} </div>
        </div>
      )}
    </div>
  )
}

export default NftListItem
