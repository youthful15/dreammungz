import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Modal from "../components/modal/Modal"
import SpinnerModal from "../components/modal/SpinnerModal"
import TradeHistory from "../components/nftDetail/TradeHistory"
import { MFTContract } from "../utils/Web3Config"
import NFTImage from "../components/nftDetail/NFTImage"
import {
  buyNowFormat,
  sellFormat,
  sellAbortFormat,
  acceptNegoFormat,
  cancelNegoFormat,
  proposalFormat,
} from "../components/nftDetail/tradeFormat"
import { getBalance } from "../utils/web3"
import { getNftDetail } from "../components/nftDetail/nftDetailRestapi"
import NftMainDetail from "../components/nftDetail/NftMainDetail"
import NftTradeButton from "../components/nftDetail/NftTradeButton"
import memberAtom from "../recoil/member/atom"
import tradeAtom from "../recoil/trade/atom"
import { useRecoilState } from "recoil"
import NftSellFormat from "../components/nftDetail/NftSellFormat"
import OfferHistory from "../components/nftDetail/OfferHistory"
import Spinner from "../components/spinner/Spinner"

export default function NftDetail() {
  const [member] = useRecoilState(memberAtom)
  const [trade, setTrade] = useRecoilState(tradeAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const tokenId: any = parseInt(location.pathname.split("/")[3])
  const publicAddress: any = localStorage.getItem("publicAddress")

  // NFT 정보
  const [nftInfo, setNftInfo] = useState<any>(undefined)

  const [balance, setBalance] = useState(0) // 본인 지갑
  useEffect(() => {
    setBalance(member.walletBalance)
  }, [member.walletBalance])
  useEffect(() => {
    setCost(trade.buyNowPrice)
  }, [trade.buyNowPrice])

  const [nftOwnerAddress, setNftOwnerAddress] = useState("") // NFT 주인 Address
  const [cost, setCost] = useState(20) // 즉시 구매 가격

  useEffect(() => {
    getNftDetailFunction({ tokenId })
    setTrade((prev) => {
      const variable = { ...prev }
      variable.isSellingForm = false
      return { ...variable }
    })
  }, [])
  useEffect(() => {
    getNftDetailFunction({ tokenId })
  }, [member])

  // 해당 NFT의 모든 정보 nftInfo로 저장
  async function getNftDetailFunction({ tokenId }: { tokenId: number }) {
    const getAllNftDetail: any = await getNftDetail({ tokenId })
    await setNftInfo(getAllNftDetail.data)
  }

  // NFT의 주인이 나인지 확인하는 함수
  async function checkIsOwner({ tokenId }: { tokenId: number }) {
    const tmp = await MFTContract.methods.ownerOf(tokenId).call()
    setNftOwnerAddress(tmp)
  }
  useEffect(() => {
    checkIsOwner({ tokenId })
  }, [])

  return (
    <div className="h-full w-full">
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
      </SpinnerModal>
      {/* 스피너 모달 끝 */}

      {/* 판매 중지 모달 시작 */}
      <Modal
        isOpen={trade.modalOpen1}
        modalClose={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen1 = false
            return { ...variable }
          })
        }}
      >
        <p className="text-xl font-semibold mb-4">판매를 중지하시겠습니까?</p>

        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setBalance(receivedBalance)
              await sellAbortFormat({ tokenId, publicAddress })
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen1 = false
                return { ...variable }
              })
            }}
          >
            확인
          </button>
          <button
            className="border border-black"
            onClick={() =>
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen1 = false
                return { ...variable }
              })
            }
          >
            닫기
          </button>
        </div>
      </Modal>
      {/* 판매 중지 모달 끝 */}

      {/* 즉시 구매 모달 시작 */}
      <Modal
        isOpen={trade.modalOpen2}
        modalClose={() =>
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen2 = false
            return { ...variable }
          })
        }
      >
        <p className="text-xl font-semibold mb-4">즉시 구매하시겠습니까?</p>
        <p className="mb-4">즉시 구매 가격: {cost}</p>
        <p>나의 M: {balance} M</p>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setBalance(receivedBalance)

              buyNowFormat({ balance, cost, tokenId, publicAddress })
            }}
          >
            구매
          </button>
          <button
            className="border border-black"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen2 = false
                return { ...variable }
              })
            }}
          >
            취소
          </button>
        </div>
      </Modal>
      {/* 즉시 구매 모달 끝 */}

      {/* 가격 제안하기 모달 시작 */}
      <Modal
        isOpen={trade.modalOpen3}
        modalClose={() =>
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen3 = false
            return { ...variable }
          })
        }
      >
        <p className="text-xl font-semibold mb-4">제안하실 M을 입력해주세요</p>
        <p className="mb-4">가격 제시</p>
        <p>현재 보유 금액: {balance} M</p>
        <input
          className="border border-black"
          id="proposal"
          type="text"
          onChange={(e) => {
            setTrade((prev) => {
              const variable = { ...prev }
              variable.offerPrice = parseInt(e.target.value)
              return { ...variable }
            })
          }}
        />

        <label htmlFor="proposal">M</label>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              const proposal = trade.offerPrice
              if (proposal === 0) {
                alert("0M 이상 제안하셔야 합니다. 다시 입력해주세요.")
              } else {
                const receivedBalance = await getBalance()
                await setBalance(receivedBalance)
                await proposalFormat({
                  balance,
                  proposal,
                  tokenId,
                  publicAddress,
                })
                await setTrade((prev) => {
                  const variable = { ...prev }
                  variable.modalOpen3 = false
                  return { ...variable }
                })
              }
            }}
          >
            구매
          </button>
          <button
            className="border border-black"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen3 = false
                return { ...variable }
              })
            }}
          >
            취소
          </button>
        </div>
      </Modal>
      {/* 가격 제안하기 모달 끝 */}

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
            className="mr-4 border border-black"
            onClick={async () => {
              const clickedNegoId = trade.selectedOfferId
              await cancelNegoFormat({ clickedNegoId, publicAddress, tokenId })
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen4 = false
                return { ...variable }
              })
            }}
          >
            확인
          </button>
          <button
            className="border border-black"
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

      {/* 가격 제안수락 모달 시작 */}
      <Modal
        isOpen={trade.modalOpen5}
        modalClose={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen5 = false
            return { ...variable }
          })
        }}
      >
        <p className="text-xl font-semibold mb-4">제안을 수락하시겠습니까?</p>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              const negoId = trade.selectedOfferId
              await acceptNegoFormat({ tokenId, negoId, publicAddress })
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen5 = false
                return { ...variable }
              })
            }}
          >
            확인
          </button>
          <button
            className="border border-black"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen5 = false
                return { ...variable }
              })
            }}
          >
            닫기
          </button>
        </div>
      </Modal>
      {/* 가격 제안수락 모달 끝 */}

      {nftInfo !== undefined ? (
        <div className="h-[50%] w-full flex">
          {/* NFT 이미지 */}
          <NFTImage imageUrl={nftInfo.nft.url} />

          <div className="w-[50%]">
            {/* NFT 주요 정보 */}
            <NftMainDetail info={nftInfo} />

            {/* NFT 판매 버튼 - 판매 시작, 판매 중단, 즉시 구매, 오퍼 신청 */}
            <NftTradeButton
              nftOwnerAddress={nftOwnerAddress}
              publicAddress={publicAddress}
              info={nftInfo}
            />
          </div>
        </div>
      ) : null}

      {/* 판매 설정 */}
      {nftInfo !== undefined && trade.isSellingForm === true ? (
        <NftSellFormat publicAddress={publicAddress} tokenId={tokenId} />
      ) : nftInfo !== undefined && trade.isSellingForm === false ? (
        <div className="h-[50%] w-full flex">
          <TradeHistory info={nftInfo} />
          <div className="w-[5%]"></div>

          <OfferHistory info={nftInfo} publicAddress={publicAddress} />
        </div>
      ) : null}
    </div>
  )
}
