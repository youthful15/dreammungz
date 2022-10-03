import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { MFTContract } from "../utils/Web3Config"
import { getBalance } from "../utils/web3"
import Modal from "../components/modal/Modal"
import SpinnerModal from "../components/modal/SpinnerModal"
import TradeHistory from "../components/nftDetail/TradeHistory"
import NFTImage from "../components/nftDetail/NFTImage"
import {
  sellFormat,
  buyNowFormat,
  sellAbortFormat,
  acceptNegoFormat,
  cancelNegoFormat,
  proposalFormat,
} from "../components/nftDetail/tradeFormat"
import { getNftDetail } from "../api/nft"
import NftMainDetail from "../components/nftDetail/NftMainDetail"
import NftTradeButton from "../components/nftDetail/NftTradeButton"
import memberAtom from "../recoil/member/atom"
import tradeAtom from "../recoil/trade/atom"
import OfferHistory from "../components/nftDetail/OfferHistory"
import Spinner from "../components/spinner/Spinner"
import "../components/button/NegativeBtn.css"
import "../components/button/PositiveBtn.css"
import "../components/button/NeutralBtn.css"
import "../components/button/switch.css"

export default function NftDetail() {
  const [member, setMember] = useRecoilState(memberAtom)
  const [trade, setTrade] = useRecoilState(tradeAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const tokenId: number = parseInt(location.pathname.split("/")[3])
  const publicAddress: any = localStorage.getItem("publicAddress")

  // NFT 정보
  const [nftInfo, setNftInfo] = useState<any>(undefined)
  const [negoAble, setNegoAble] = useState(false) // 판매 등록 정보

  const [balance, setBalance] = useState(0) // 본인 지갑
  useEffect(() => {
    setBalance(member.walletBalance)
  }, [member])

  const [nftOwnerAddress, setNftOwnerAddress] = useState("") // NFT 주인 Address

  useEffect(() => {
    getNftDetailFunction(tokenId)
    setTrade((prev) => {
      const variable = { ...prev }
      variable.isSellingForm = false
      return { ...variable }
    })
  }, [])

  // 해당 NFT의 모든 정보 nftInfo로 저장
  async function getNftDetailFunction(tokenId: number) {
    // const getAllNftDetail: any = await getNftDetail({ tokenId })
    const data = await getNftDetail(tokenId)
    await setNftInfo(data)
    await setTrade((prev) => {
      const variable = { ...prev }
      variable.buyNowPrice = data.nft.price
      return { ...variable }
    })
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
    <div className="h-full w-full mapleStory">
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
        <p className="text-3xl font-semibold mb-4 text-center">
          판매를 중지하시겠습니까?
        </p>

        <div className="flex justify-center">
          <button
            className="negative-btn mr-4"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setBalance(receivedBalance)
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen1 = false
                variable.modalOpen6 = true
                return { ...variable }
              })
              await sellAbortFormat(tokenId, publicAddress)
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen1 = false
                variable.modalOpen6 = false
                return { ...variable }
              })
            }}
          >
            중지
          </button>
          <button
            className="positive-btn"
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
        <p className="text-center text-4xl font-semibold mb-4">
          즉시 구매하시겠습니까?
        </p>
        <div className="flex text-xl mb-2 ml-[60px]">
          <p className="mr-[50px]">즉시 구매 가격</p>
          <p>{nftInfo?.price} M</p>
        </div>
        <div className="flex text-xl ml-[60px]">
          <p className="mr-[105px]">나의 M</p>
          <p>{balance} M</p>
        </div>
        <div className="flex justify-center mt-10 ">
          <button
            className="mr-4 positive-btn"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setBalance(receivedBalance)
              const cost = nftInfo?.price

              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen2 = false
                variable.modalOpen6 = true
                return { ...variable }
              })

              await buyNowFormat(balance, cost, tokenId, publicAddress)

              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = false
                return { ...variable }
              })
            }}
          >
            구매
          </button>
          <button
            className="negative-btn"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen2 = false
                return { ...variable }
              })
            }}
          >
            닫기
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
        <p className="text-center text-4xl font-semibold mb-4">
          제안하실 금액을 입력해주세요
        </p>

        <div className="flex text-xl ml-[60px] mb-2">
          <p className="mr-[50px]">현재 보유 금액</p>
          <p>{balance} M</p>
        </div>

        <div className="flex text-xl mb-2 ml-[60px]">
          <p className="mr-[87px]">제안 금액</p>
          <input
            className="border border-black mr-1 w-[150px]"
            id="proposal"
            type="text"
            onChange={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1")
              setTrade((prev) => {
                const variable = { ...prev }
                variable.offerPrice = parseInt(e.target.value)
                return { ...variable }
              })
            }}
          />
          <label htmlFor="proposal">M</label>
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="mr-4 positive-btn"
            onClick={async () => {
              const proposal = trade.offerPrice
              if (proposal === 0) {
                alert("0M 이상 제안하셔야 합니다. 다시 입력해주세요.")
              } else {
                const receivedBalance = await getBalance()
                await setBalance(receivedBalance)
                await setTrade((prev) => {
                  const variable = { ...prev }
                  variable.modalOpen3 = false
                  variable.modalOpen6 = true
                  return { ...variable }
                })
                await proposalFormat(balance, proposal, tokenId, publicAddress)
                await setTrade((prev) => {
                  const variable = { ...prev }
                  variable.modalOpen6 = false
                  return { ...variable }
                })
              }
            }}
          >
            제안
          </button>
          <button
            className="negative-btn"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen3 = false
                return { ...variable }
              })
            }}
          >
            닫기
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
        <p className="text-center text-4xl font-semibold mb-4">
          제안을 취소하시겠습니까?
        </p>
        <div className="flex justify-center mt-10">
          <button
            className="mr-4 positive-btn"
            onClick={async () => {
              const clickedNegoId = trade.selectedOfferId
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen4 = false
                variable.modalOpen6 = true
                return { ...variable }
              })
              await cancelNegoFormat(clickedNegoId, publicAddress, tokenId)
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
            className="negative-btn"
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
        <p className="text-center text-4xl font-semibold mb-4">
          제안을 수락하시겠습니까?
        </p>
        <div className="flex justify-center mt-10">
          <button
            className="mr-4 positive-btn"
            onClick={async () => {
              const negoId = trade.selectedOfferId

              // spinner 시작
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen5 = false
                variable.modalOpen6 = true
                return { ...variable }
              })

              await acceptNegoFormat(tokenId, negoId, publicAddress)

              // spinner 종료
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = false
                return { ...variable }
              })
            }}
          >
            수락
          </button>
          <button
            className="border negative-btn"
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

      {/* 판매 등록 모달 시작 */}
      <Modal
        isOpen={trade.modalOpen8}
        modalClose={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen8 = false
            return { ...variable }
          })
        }}
      >
        <p className="text-center text-4xl font-semibold mb-4">
          판매 정보를 입력해주세요
        </p>

        <div className="flex text-xl font-semibold mb-4">
          <p className="mr-[50px]">즉시 구매 가격</p>
          <input
            id="price"
            type="text"
            className="border w-[150px]"
            onChange={(e: any) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1")

              setTrade((prev) => {
                const variable = { ...prev }
                variable.buyNowPrice = e.target.value
                return { ...variable }
              })
            }}
          />
          <label htmlFor="price" className="ml-2">
            M
          </label>
        </div>
        <div className="flex justify-center flex-col">
          <div className="flex text-xl font-semibold">
            <p className="mr-[90px]">오퍼 유무</p>

            <div className="can-toggle ml-[2px]">
              <input
                id="a"
                type="checkbox"
                onClick={() => {
                  if (negoAble) {
                    setNegoAble(false)
                  } else {
                    setNegoAble(true)
                  }
                }}
              />
              <label htmlFor="a">
                <div
                  className="can-toggle__switch"
                  data-checked="가능"
                  data-unchecked="불가능"
                ></div>
              </label>
            </div>
            {/* TESTEST */}
            {/* TESTEST */}
          </div>
        </div>
        <div className="flex mt-10 justify-center">
          <button
            type="submit"
            className="positive-btn mr-5"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setMember((prev) => {
                const variable = { ...prev }
                variable.walletBalance = receivedBalance
                return { ...variable }
              })
              const buyNowPrice = trade.buyNowPrice
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = true
                variable.modalOpen8 = false
                return { ...variable }
              })
              await sellFormat(publicAddress, negoAble, tokenId, buyNowPrice)
              await setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen6 = false
                return { ...variable }
              })
            }}
          >
            판매 등록
          </button>

          <button
            className="border negative-btn"
            onClick={() => {
              setTrade((prev) => {
                const variable = { ...prev }
                variable.modalOpen8 = false
                variable.isSellingForm = false
                return { ...variable }
              })
            }}
          >
            닫기
          </button>
        </div>
      </Modal>
      {/* 판매 등록 모달 끝 */}

      {nftInfo !== undefined ? (
        <div className="h-[50%] w-full flex">
          {/* NFT 이미지 */}
          <NFTImage imageUrl={nftInfo.nft.url} />

          <div className="w-[70%]">
            {/* NFT 주요 정보 */}
            <NftMainDetail
              info={nftInfo}
              publicAddress={publicAddress}
              nftOwnerAddress={nftOwnerAddress}
            />

            {/* NFT 판매 버튼 - 판매 시작, 판매 중단, 즉시 구매, 오퍼 신청 */}
            <NftTradeButton
              nftOwnerAddress={nftOwnerAddress}
              publicAddress={publicAddress}
              info={nftInfo}
            />
          </div>
        </div>
      ) : null}

      {/* 거래 이력 & 오퍼리스트 출력 */}
      {nftInfo !== undefined ? (
        <div className="h-[50%] w-full flex">
          <TradeHistory info={nftInfo} />
          <div className="w-[5%]"></div>

          <OfferHistory info={nftInfo} publicAddress={publicAddress} />
        </div>
      ) : null}
    </div>
  )
}
