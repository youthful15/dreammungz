import { useNavigate } from "react-router-dom"
import Modal from "../modal/Modal"
import tradeAtom from "../../recoil/trade/atom"
import { useRecoilState } from "recoil"
import {
  cancelNegoFormat,
  proposalRefundFormat,
} from "../nftDetail/tradeFormat"

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
  url: string
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
  const [trade, setTrade] = useRecoilState(tradeAtom)
  const publicAddress: any = localStorage.getItem("publicAddress")

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
    url,
  } = props.item

  // refund, cancel, choice
  const typeReturn = () => {
    if (refund === true) {
      return <span className="text-blue-500">환불 완료</span>
    } else if (refund === false && choice === false && cancel === false) {
      return (
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => {
            setTrade((prev) => {
              const variable = { ...prev }
              variable.modalOpen4 = true
              return { ...variable }
            })
          }}
        >
          취소 가능
        </span>
      )
    } else if (refund === false && choice === false && cancel === true) {
      return (
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => {
            setTrade((prev) => {
              const variable = { ...prev }
              variable.modalOpen7 = true
              return { ...variable }
            })
          }}
        >
          환불 가능
        </span>
      )
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
      {/* 가격 제안취소 모달 시작 */}
      <Modal
        isOpen={trade.modalOpen4}
        modalClose={() =>
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen4 = false
            return { ...variable }
          })
        }
      >
        <p className="text-xl font-semibold mb-4">제안을 취소하시겠습니까?</p>
        <div className="flex justify-center">
          <button
            className="mr-4 negative-btn"
            onClick={async () => {
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen4 = false
                variable.modalOpen6 = true
                return { ...variable }
              })
              await cancelNegoFormat(tradeId, publicAddress, tokenId)
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = false
                return { ...variable }
              })
            }}
          >
            확인
          </button>
          <button
            className="positive-btn"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen4 = false
                return { ...variable }
              })
            }}
          >
            닫기
          </button>
        </div>
      </Modal>
      {/* 가격 제안취소 모달 끝 */}

      {/* 가격 제안환불 모달 시작 */}
      <Modal
        isOpen={trade.modalOpen7}
        modalClose={() =>
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen7 = false
            return { ...variable }
          })
        }
      >
        <p className="text-xl font-semibold mb-4">제안을 취소하시겠습니까?</p>
        <div className="flex justify-center">
          <button
            className="mr-4 negative-btn"
            onClick={async () => {
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen7 = false
                variable.modalOpen6 = true
                return { ...variable }
              })
              await proposalRefundFormat(tradeId, offerId, publicAddress)
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = false
                return { ...variable }
              })
            }}
          >
            확인
          </button>
          <button
            className="positive-btn"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen4 = false
                return { ...variable }
              })
            }}
          >
            닫기
          </button>
        </div>
      </Modal>
      {/* 가격 제안환불 모달 끝 */}

      <div className=" w-[40px]">{tokenId}</div>
      <img src={url} className="w-[45px] h-[45px] " />
      <div className=" w-[100px]">{typeReturn()}</div>
      <div className=" w-[100px]">{offerPrice} M </div>
      <div className=" w-[100px]">{offerNickname}</div>
      <div className=" w-[120px]">{offerDate}</div>
    </div>
  )
}

export default OfferHistoryItem
