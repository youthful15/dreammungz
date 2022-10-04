import { useQueries, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getOfferHistory } from "../../api/nft"
import Pagination from "../pagination/Pagination"
import OfferHistoryItem, { OfferHistoryListHead } from "./OfferHistoryListItem"
import Modal from "../modal/Modal"
import SpinnerModal from "../modal/SpinnerModal"
import Spinner from "../spinner/Spinner"
import tradeAtom from "../../recoil/trade/atom"
import { useRecoilState } from "recoil"
import {
  cancelNegoFormat,
  proposalRefundFormat,
} from "../nftDetail/tradeFormat"

const thead = {
  id: "ID",
  price: "가격",
  type: " 오퍼 상태 ",
  date: "오퍼 날짜 ",
}

type dealItemType = {
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

const NftOfferHistoryList = ({ address }: { address: string }) => {
  const [page, setPage] = useState(0)
  const [trade, setTrade] = useRecoilState(tradeAtom)
  const publicAddress: any = localStorage.getItem("publicAddress")

  const { data } = useQuery(["OfferList", page], () =>
    getOfferHistory(address, page)
  )
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full text-center ">
      {/* 스피너 모달 시작 */}
      <SpinnerModal
        isOpen={trade.modalOpen6}
        modalClose={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen6 = false
            return { ...variable }
          })
        }}
      >
        <Spinner />
        <div className="text-2xl font-semibold absolute mt-[70%]">
          <p className="">NFT 거래중..</p>
        </div>
      </SpinnerModal>
      {/* 스피너 모달 끝 */}

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
        <p className="text-center text-4xl font-semibold mb-4">
          제안을 취소하시겠습니까?
        </p>

        <div className="flex justify-center mt-10">
          <button
            className="mr-4 negative-btn"
            onClick={async () => {
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen4 = false
                variable.modalOpen6 = true
                return { ...variable }
              })
              await cancelNegoFormat(
                trade.clickedOfferId,
                publicAddress,
                trade.clickedTokenId
              )
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = false
                return { ...variable }
              })
            }}
          >
            취소
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
        <p className="text-center text-4xl font-semibold mb-4">
          환불하시겠습니까 ?
        </p>
        <div className="flex justify-center mt-10">
          <button
            className="mr-4 negative-btn"
            onClick={async () => {
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen7 = false
                variable.modalOpen6 = true
                return { ...variable }
              })
              await proposalRefundFormat(
                trade.clickedTradeId,
                trade.clickedOfferId,
                publicAddress
              )
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = false
                return { ...variable }
              })
              window.location.reload()
            }}
          >
            환불
          </button>
          <button
            className="positive-btn"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen7 = false
                return { ...variable }
              })
            }}
          >
            닫기
          </button>
        </div>
      </Modal>
      {/* 가격 제안환불 모달 끝 */}

      <div className="w-4/5 space-y-4 h-[80%] ">
        <OfferHistoryListHead item={thead} />
        {data && data.offer.length === 0 && (
          <div className=" py-28">오퍼 내역이 존재하지 않습니다.</div>
        )}
        {data &&
          data.offer.map((item: dealItemType, idx: number) => {
            const deal = { ...item, date: item.offerDate.split(" ")[0] }
            return <OfferHistoryItem item={deal} key={idx} />
          })}
      </div>
      {data?.totalPage >= 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={data.totalPage + 1}
        />
      )}
    </div>
  )
}

export default NftOfferHistoryList
