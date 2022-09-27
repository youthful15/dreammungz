import { useNavigate } from "react-router-dom"

interface OfferHistoryItem {
  cancel: boolean
  choice: boolean
  offerAddress: string
  offerDate: string
  offerId: number
  offerNickname: number
  offerPrice: number
  refund: boolean
  tokenId: number
  tradeId: number
}

export const OfferHistoryListHead = ({ item }: any) => {
  const { id, type, date, price } = item

  return (
    <div className="bg-white  flex  w-full space-x-1 h-[50px]  items-cente justify-around leading-[50px]  font-semibold rounded-2xl shadow-md ">
      <div className=" w-[40px]">{id}</div>
      <div className=" w-[45px]">NFT</div>
      <div className=" w-[100px]">{type}</div>
      <div className=" w-[100px]">{price} </div>
      <div className=" w-[100px]">거래자</div>
      <div className=" w-[120px]">{date}</div>
    </div>
  )
}

const OfferHistoryItem = ({ ...props }) => {
  const navigate = useNavigate()
  const {
    cancel,
    choice,
    offerAddress,
    offerDate,
    offerId,
    offerNickname,
    offerPrice,
    refund,
    tokenId,
    tradeId,
  } = props.item

  // refund, cancel, choice
  const typeReturn = () => {
    if (refund === true) {
      return <span className="text-blue-500">환불 완료</span>
    } else if (refund === false && choice === false && cancel === false) {
      return <span className="text-red-500">취소 가능</span>
    } else if (refund === false && choice === false && cancel === true) {
      return <span className="text-red-500">환불 가능</span>
    } else if (refund === false && choice === true) {
      return <span className="text-gray-500">채택됨</span>
    }
  }

  const movePage = () => {
    navigate(`/nft/detail/${tokenId}`)
  }

  return (
    <div
      onClick={movePage}
      className="bg-white  flex  w-full space-x-1 h-[50px]  items-cente justify-around leading-[50px]  rounded-2xl shadow-md hover:scale-110 cursor-pointer"
    >
      <div className=" w-[40px]">{tokenId}</div>
      <img src={"url"} className="w-[45px] h-[45px] " />
      <div className=" w-[100px]">{typeReturn()}</div>
      <div className=" w-[100px]">{offerPrice} M </div>
      <div className=" w-[100px]">{offerNickname}</div>
      <div className=" w-[120px]">{offerDate}</div>
    </div>
  )
}

export default OfferHistoryItem
