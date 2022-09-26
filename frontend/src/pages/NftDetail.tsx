import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Modal from "../components/modal/Modal"
import TransactionHistory from "../components/nftDetail/TransactionHistory"
import {
  web3,
  MUNGContract,
  MFTSaleFactoryContract,
  MFTContract,
} from "../utils/Web3Config"
import { http } from "../api/axios"
import NFTImage from "../components/nftDetail/NFTImage"
import {
  buyNowFormat,
  sellFormat,
  sellAbortFormat,
  acceptNegoFormat,
  cancelNegoFormat,
} from "../components/nftDetail/tradeFormat"
import { getBalance } from "../utils/web3"

interface OfferListProp {
  id: number
  buyerAddress: string
  buyerNickname: string
  price: number
  date: string
  contractId: number
}

const tradeList: any = [
  {
    url: "image_url",
    type: "BUY",
    sellerNickname: "df2de2",
    sellerAddress: "0x34234f3r324234",
    date: "yyyy-mm-dd",
    price: 12,
    tradeList: [
      {
        sellerNickname: "asd",
        sellerAddress: "0x1232wsdf32r",
        buyerNickname: "sdfsdf",
        buyerAddress: "0x1232dfjsiodf",
        date: "2022-08-15", // 거래했던 날짜
        price: 123,
      },
      {
        sellerNickname: "asdsfd",
        sellerAddress: "0x123asdasfdsfsdf32r",
        buyerNickname: "sdfsdf",
        buyerAddress: "0x134dfjsiodf",
        date: "2021-08-15", // 거래했던 날짜
        price: 120,
      },
      {
        sellerNickname: "123123",
        sellerAddress: "0x346sdf32r",
        buyerNickname: "cxvdsff",
        buyerAddress: "0x654fjsiodf",
        date: "2022-08-17", // 거래했던 날짜
        price: 100,
      },
    ],
    offerList: [
      {
        id: 1,
        contractId: 1,
        buyerAddress: "buy1",
        buyerNickname: "HeyHi",
        price: 70,
        date: "offerdate",
      },
      {
        id: 2,
        contractId: 2,
        buyerAddress: "buy2",
        buyerNickname: "wer",
        price: 60,
        date: "offerdate",
      },
      {
        id: 3,
        contractId: 3,
        buyerAddress: "buy4",
        buyerNickname: "Byeee",
        price: 65,
        date: "offerdate",
      },
    ],
  },
]

export default function NftDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const tokenId: any = parseInt(location.pathname.split("/")[3])
  const publicAddress: any = localStorage.getItem("publicAddress")

  // 판매 등록 정보
  const [negoAble, setNegoAble] = useState(true)
  const [buyNowPrice, setbuyNowPrice] = useState(0)

  const [balance, setBalance] = useState(0) // 본인 지갑

  const [negoId, setNegoId] = useState(0) // Negotiation Id
  const [clickedNegoId, setClickedNegoId] = useState(0) // 클릭된 아이템의 NegoId
  const [sellerWalletAddress, setSellerWalletAddress] = useState("") // 판매자 Address
  const [nftOwnerAddress, setNftOwnerAddress] = useState("") // NFT 주인 Address

  const [isSelling, setIsSelling] = useState<any>(false) // 판매중인지 확인
  const [clickedSell, setClickedSell] = useState(false) // 판매 눌렀는지 확인

  const [isOpen1, setOpen1] = useState(false) // 판매 중지 모달
  const modalClose1 = () => setOpen1(false) // 판매 중지 모달

  const [isOpen2, setOpen2] = useState(false) // 즉시 구매 모달
  const modalClose2 = () => setOpen2(false) // 즉시 구매 모달
  const [cost, setCost] = useState(20) // 즉시 구매 가격

  const [isOpen3, setOpen3] = useState(false) // 가격 제안하기 모달
  const modalClose3 = () => setOpen3(false) // 가격 제안하기 모달
  const [proposal, setProposal] = useState(20) // 가격 제안 가격

  const [isOpen4, setOpen4] = useState(false) // 가격 제안취소 모달
  const modalClose4 = () => setOpen4(false) // 가격 제안취소 모달

  const [isOpen5, setOpen5] = useState(false) // 가격 제안수락 모달
  const modalClose5 = () => setOpen5(false) // 가격 제안수락 모달

  useEffect(() => {
    async function saleStatusConfirm() {
      try {
        // 해당 MFT의 거래 상태 확인
        const saleStatus: any = await MFTSaleFactoryContract.methods
          .getSaleStatusOfMFT(tokenId)
          .call()
        if (saleStatus === true) {
          // contractId 받기
          const saleContractId = await MFTSaleFactoryContract.methods
            .getCurrentSaleOfMFT(tokenId)
            .call()

          const getSellerAddress = await MFTSaleFactoryContract.methods
            .getSeller(saleContractId)
            .call()
          await setSellerWalletAddress(getSellerAddress)
        }
      } catch (err) {
        console.error(err)
      }
    }
    saleStatusConfirm()
  }, [])

  // NFT의 주인이 나인지 확인하는 함수
  async function checkIsOwner() {
    const tmp = await MFTContract.methods.ownerOf(tokenId).call()
    setNftOwnerAddress(tmp)
  }

  useEffect(() => {
    checkIsOwner()
  }, [])

  // 판매 상태 중인지 확인
  useEffect(() => {
    MFTSaleFactoryContract.methods
      .getSaleStatusOfMFT(tokenId)
      .call()
      .then((res: any) => setIsSelling(res))
  }, [])

  // 실시간 반영
  const onChangeProposal = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value: any = event.currentTarget
    await setProposal(value)
  }

  // Sale Contract Id 가져오기
  const getSaleContractId = async () => {
    const contractId = await MFTSaleFactoryContract.methods
      .getCurrentSaleOfMFT(tokenId)
      .call()
    console.log(contractId)
  }

  // NFT 네고 제안 -------------------------------------------------------------------------
  const proposalFormat = async ({
    balance,
    proposal,
    tokenId,
    publicAddress,
  }: {
    balance: number
    proposal: number
    tokenId: number
    publicAddress: string
  }) => {
    proposal = 20
    if (balance < proposal) {
      // 금액이 부족할때
      alert("M이 부족합니다!")
    } else {
      try {
        // contractId 받기
        const saleContractId = await MFTSaleFactoryContract.methods
          .getCurrentSaleOfMFT(tokenId)
          .call()

        const saleContractAddress = await MFTSaleFactoryContract.methods
          .getSale(saleContractId)
          .call()

        await MUNGContract.methods
          .approve(
            saleContractAddress,
            web3.utils.toBN(proposal * 10 ** 18).toString()
          )
          .send({ from: publicAddress })

        console.log("saleContractId", saleContractId)
        console.log("saleContractAddress", saleContractAddress)
        console.log("proposal", proposal)
        let createdNegoId

        // createNego
        await MFTSaleFactoryContract.methods
          .createNego(saleContractId, publicAddress, proposal, false, false)
          .send({ from: publicAddress })
          .then((res: any) => {
            setNegoId(res.events.NegoCreated.returnValues.negoId)
            createdNegoId = parseInt(res.events.NegoCreated.returnValues.negoId)
          })

        // // 네고 제안
        console.log(
          publicAddress,
          saleContractId,
          proposal,
          tokenId,
          createdNegoId
        )
        await http
          .post("trade/offerRegister", {
            address: publicAddress,
            tradeContractId: saleContractId,
            price: proposal,
            tokenId: tokenId,
            negoContractId: createdNegoId,
          })
          .then((res) => console.log(res))
          .catch((err) => console.error(err))

        // spiner 필요
        alert("네고 하는 중입니다")
      } catch (err) {
        console.error(err)
        alert("취소되었습니다.")
      }

      setIsSelling(false)
      navigate("/nft/list")
    }
  }

  return (
    <div className="h-full w-full">
      {/* 판매 중지 모달 시작 */}
      <Modal isOpen={isOpen1} modalClose={modalClose1}>
        <p className="text-xl font-semibold mb-4">판매를 중지하시겠습니까?</p>

        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setBalance(receivedBalance)
              await sellAbortFormat({ tokenId, publicAddress })
              await modalClose1()
              await setIsSelling(false)
            }}
          >
            확인
          </button>
          <button className="border border-black" onClick={() => modalClose1()}>
            닫기
          </button>
        </div>
      </Modal>
      {/* 판매 중지 모달 끝 */}

      {/* 즉시 구매 모달 시작 */}
      <Modal isOpen={isOpen2} modalClose={modalClose2}>
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
          <button className="border border-black" onClick={() => modalClose2()}>
            취소
          </button>
        </div>
      </Modal>
      {/* 즉시 구매 모달 끝 */}

      {/* 가격 제안하기 모달 시작 */}
      <Modal isOpen={isOpen3} modalClose={modalClose3}>
        <p className="text-xl font-semibold mb-4">제안하실 M을 입력해주세요</p>
        <p className="mb-4">가격 제시</p>
        <p>현재 보유 금액: {balance} M</p>
        <input
          className="border border-black"
          id="proposal"
          type="text"
          onChange={onChangeProposal}
        />
        <label htmlFor="proposal">M</label>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              const receivedBalance = await getBalance()
              await setBalance(receivedBalance)
              await proposalFormat({
                balance,
                proposal,
                tokenId,
                publicAddress,
              })
              await modalClose3()
              await setIsSelling(false)
            }}
          >
            구매
          </button>
          <button className="border border-black" onClick={() => modalClose3()}>
            취소
          </button>
        </div>
      </Modal>
      {/* 가격 제안하기 모달 끝 */}

      {/* 가격 제안취소 모달 시작 */}
      <Modal isOpen={isOpen4} modalClose={modalClose4}>
        <p className="text-xl font-semibold mb-4">제안을 취소하시겠습니까?</p>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              await cancelNegoFormat({ clickedNegoId, publicAddress, tokenId })
              await modalClose4()
              // await setIsSelling(false)
            }}
          >
            확인
          </button>
          <button className="border border-black" onClick={() => modalClose4()}>
            닫기
          </button>
        </div>
      </Modal>
      {/* 가격 제안취소 모달 끝 */}

      {/* 가격 제안수락 모달 시작 */}
      <Modal isOpen={isOpen5} modalClose={modalClose5}>
        <p className="text-xl font-semibold mb-4">제안을 수락하시겠습니까?</p>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={async () => {
              await acceptNegoFormat({ tokenId, negoId, publicAddress })
              await modalClose5()
              // await setIsSelling(false)
            }}
          >
            확인
          </button>
          <button className="border border-black" onClick={() => modalClose5()}>
            닫기
          </button>
        </div>
      </Modal>
      {/* 가격 제안수락 모달 끝 */}
      <div className="h-[50%] w-full flex">
        <NFTImage />

        <div className="w-[50%]">
          <p>DREAMMUNGS</p>
          <p>Tags</p>
          <p>500 M</p>
          <p>분양자</p>
          <p>Unique</p>

          {/* TEST CODE */}
          {/* TEST CODE */}
          {/* TEST CODE */}
          {/* TEST CODE */}
          {/* TEST CODE */}
          <button
            className="border border-black"
            onClick={() => {
              setOpen4(true)
            }}
          >
            네고 취소
          </button>
          <button
            className="border border-black"
            onClick={() => {
              setOpen5(true)
            }}
          >
            네고 승낙
          </button>
          {/* TEST CODE */}
          {/* TEST CODE */}
          {/* TEST CODE */}
          {/* TEST CODE */}
          {/* TEST CODE */}
          {/* TEST CODE */}
          <div>
            {/* 본인 NFT 인지 확인 */}
            {nftOwnerAddress &&
            publicAddress?.toLowerCase() !== nftOwnerAddress?.toLowerCase() ? (
              isSelling === true ? (
                <div className="flex">
                  <button
                    className="border border-black mr-3"
                    onClick={async () => {
                      const receivedBalance = await getBalance()
                      await setBalance(receivedBalance)
                      setOpen2(true)
                    }}
                  >
                    즉시 구매
                  </button>
                  <button
                    className="border border-black"
                    onClick={async () => {
                      const receivedBalance = await getBalance()
                      await setBalance(receivedBalance)
                      setOpen3(true)
                    }}
                  >
                    가격 제안하기
                  </button>
                </div>
              ) : null
            ) : (
              <div className="flex">
                {isSelling === true ? (
                  // 본인 NFT && 판매중인 경우
                  <button
                    className="w-full border border-black"
                    onClick={() => {
                      setOpen1(true)
                    }}
                  >
                    판매 중지
                  </button>
                ) : (
                  // 본인 NFT && 판매 올리지 않았을 경우
                  <button
                    className="w-full border border-black"
                    onClick={() => {
                      setClickedSell(true)
                    }}
                  >
                    판매 시작
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 판매 설정 */}
      {clickedSell === true ? (
        <div className="w-full flex justify-center">
          <div className="flex justify-center flex-col items-center">
            <div className="mb-4">
              <p className="text-center mb-1">즉시 구매가 설정</p>
              <div className="flex">
                <input
                  id="price"
                  type="text"
                  onChange={(e: any) => setbuyNowPrice(e.target.value)}
                />
                <label htmlFor="price">M</label>
              </div>
            </div>

            <div>
              <p>오퍼 유무</p>
              <div className="flex">
                <div>
                  <input
                    type="radio"
                    id="yes"
                    name="whatOffer"
                    value="yes"
                    checked
                    onChange={(e: any) => setNegoAble(true)}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="no"
                    name="whatOffer"
                    value="no"
                    onChange={(e: any) => setNegoAble(false)}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>

            <div className="flex justify- center mt-5">
              <button
                type="submit"
                className="border border-black mr-5"
                onClick={async () => {
                  const receivedBalance = await getBalance()
                  await setBalance(receivedBalance)
                  sellFormat({ publicAddress, negoAble, tokenId, buyNowPrice })
                  // await setClickedSell(false)
                  // await setIsSelling(true)
                }}
              >
                판매 등록
              </button>

              <button
                className="border border-black"
                onClick={async () => {
                  setClickedSell(false)
                  getSaleContractId()
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50%] w-full flex">
          <TransactionHistory />
          <div className="w-[5%]"></div>
          <div className="w-[47.5%] border rounded-lg border-black">
            <p className="text-xl font-semibold ml-2">오퍼 리스트</p>
            <div className="w-full bg-transparent h-[90%] p-2">
              {tradeList ? (
                <div>
                  <div>
                    <div className="flex w-full border border-b-black border-t-transparent border-l-transparent border-r-transparent">
                      <p className="w-[20%]">가격</p>
                      <p className="w-[20%]">From</p>
                      <p>Date</p>
                    </div>
                  </div>

                  {tradeList[0]?.offerList.map(
                    ({
                      // Contract ID == Nego ID,  ==> contractId,
                      id,
                      contractId,
                      buyerAddress,
                      buyerNickname,
                      price,
                      date,
                    }: OfferListProp) => {
                      return (
                        <div className="flex" key={id}>
                          <ul className="w-full flex py-1">
                            <li className="w-[20%]">{price}</li>

                            <li
                              className="w-[20%] text-lgBrown-600
 hover:text-lgBrown-700 cursor-pointer"
                            >
                              {buyerNickname}
                            </li>
                            <li className="w-[30%]">{date}</li>

                            {buyerAddress === publicAddress ? (
                              <li
                                className="border border-black"
                                onClick={async () => {
                                  const receivedBalance = await getBalance()
                                  await setBalance(receivedBalance)
                                  await setClickedNegoId(contractId)
                                  setOpen4(true)
                                }}
                              >
                                오퍼 삭제
                              </li>
                            ) : null}
                            {sellerWalletAddress === publicAddress ? (
                              <li
                                className="border border-black"
                                onClick={() => {
                                  setOpen5(true)
                                }}
                              >
                                오퍼 수락
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      )
                    }
                  )}
                </div>
              ) : (
                <div>There is no offer</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
