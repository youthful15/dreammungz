import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import NftListItem2 from "../components/nftList/NftListItem2"
import Modal from "../components/modal/Modal"
import { MUNGContract } from "../utils/Web3Config"
import axios from "axios"

interface TradeListProp {
  sellerNickname: string
  sellerAddress: string
  buyerNickname: string
  buyerAddress: string
  date: string
  price: number
}

interface OfferListProp {
  id: number
  buyerAddress: string
  buyerNickname: string
  price: number
  date: string
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
        buyerAddress: "buy1",
        buyerNickname: "HeyHi",
        price: 70,
        date: "offerdate",
      },
      {
        id: 2,
        buyerAddress: "buy2",
        buyerNickname: "wer",
        price: 60,
        date: "offerdate",
      },
      {
        id: 3,
        buyerAddress: "buy4",
        buyerNickname: "Byeee",
        price: 65,
        date: "offerdate",
      },
    ],
  },
]

const NftDetail = () => {
  const navigate = useNavigate()
  const [balance, setBalance] = useState(0) // 본인 지갑

  const [myNft, setMyNft] = useState(false) // 본인 NFT 인지 확인
  const [isSelling, setIsSelling] = useState(false) // 판매중인지 확인
  const [clickedSell, setClickedSell] = useState(false) // 판매 눌렀는지 확인

  const [isOpen1, setOpen1] = useState(false) // 판매 중지 모달
  const modalClose1 = () => setOpen1(false) // 판매 중지 모달

  const [isOpen2, setOpen2] = useState(false) // 즉시 구매 모달
  const modalClose2 = () => setOpen2(false) // 즉시 구매 모달

  const [isOpen3, setOpen3] = useState(false) // 가격 제안하기 모달
  const modalClose3 = () => setOpen3(false) // 가격 제안하기 모달
  const [proposal, setProposal] = useState<HTMLInputElement>() // 가격 제안 가격

  // 실시간 반영
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget
    setProposal(value)
  }

  // MUNG 가져오기
  const getMung = async () => {
    const walletAddress = localStorage.getItem("publicAddress")
    const needRecoil = await MUNGContract.methods
      .balanceOf(walletAddress)
      .call()
    setBalance(needRecoil * 10 ** -18)
  }

  // 즉시 구매 Format
  const buyNowFormat = async () => {
    // 금액이 부족할떄
    if (balance < 400) {
      await alert("돈이 없습니다.")
      modalClose2()
    }

    // 금액이 충분할때
    else {
      await alert("구매 하는 중입니다.")
      modalClose2()
      setIsSelling(false)
      navigate("/nft/list") // 즉시 구매시 nft list page로 redirect
    }
  }

  // 가격 제안 format
  const proposalFormat = async () => {
    // 금액이 부족할때
    if (balance < 400) {
      await alert("돈이 없습니다.")
      modalClose3()
    }

    // 금액이 충분할때
    await alert("구매 하는 중입니다.")
    modalClose3()
    setIsSelling(false)
    navigate("/nft/list")
  }

  return (
    <div className="h-full w-full">
      {/* 판매 중지 모달 시작 */}
      <Modal isOpen={isOpen1} modalClose={modalClose1}>
        <p className="text-xl font-semibold mb-4">판매를 중지하시겠습니까?</p>

        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={() => {
              modalClose1()
              setIsSelling(false)
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
        <p className="mb-4">즉시 구매 가격: 400</p>
        <p>나의 MUNG: {balance}MUNG</p>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={() => {
              buyNowFormat()
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
        <p className="text-xl font-semibold mb-4">
          얼만큼 가격을 제시하겠습니까?
        </p>
        <p className="mb-4">가격 제시</p>
        <p>나의 지갑에 들어가 있는 Token 수: {0} MUNG</p>
        <input
          className="border border-black"
          id="proposal"
          type="text"
          onChange={onChange}
        />
        <label htmlFor="proposal">MUNG</label>
        <div className="flex justify-center">
          <button
            className="mr-4 border border-black"
            onClick={() => {
              modalClose3()
              setIsSelling(false)
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

      <div className="h-[50%] w-full flex">
        <div className="w-[50%]">
          <img
            className="w-[250px] h-[250px] bg-white"
            src=""
            alt="NFT 이미지"
          />
        </div>
        <div className="w-[50%]">
          <button
            onClick={async () => {
              const body = {
                color: "RAINBOW",
                face: "SCAR",
                gender: "F",
                hair: "CURLY",
                id: 0,
                job: "VOCALIST",
                metadata:
                  "https://w.namu.la/s/59bbf73b123d0f9f693be3c3de9506b24a1f2a3067b4ffd0207a3a08eee32d750ebf1ca3e33084aa3bbcd6916bd0a8a187cc4556b87fa269c25f1a7ff3ea279f1e372d23aa0a6eee8d5932c70d5dac0ebd01ce1f79707dd4e205f2dad4730a0264170f9ae02bf0e7d82aafa7ce8e4cc7",
                status: [
                  {
                    name: "STOUTNESS",
                    value: 3,
                  },
                  {
                    name: "VOICE",
                    value: 6,
                  },
                ],
                tier: "RARE",
              }
              // await axios
              //   .post(
              //     `https://localhost:8081/nft/result/address/${localStorage.getItem(
              //       "publicAddress"
              //     )}`,
              //     body
              //   )
              //   .then((res: any) => {
              //     console.log("res", res)
              //   })
            }}
          >
            테스트 NFT 정보 저장
          </button>
          <p>DREAMMUNGS</p>
          <p>Tags</p>
          <p>500 MUNG</p>
          <p>분양자</p>
          <p>Unique</p>

          {}

          {/* 본인 NFT 인지 확인 */}
          {myNft === false ? (
            <div className="flex">
              <button
                className="border border-black mr-3"
                onClick={() => {
                  setOpen2(true)
                  getMung()
                }}
              >
                즉시 구매
              </button>
              <button
                className="border border-black"
                onClick={() => {
                  setOpen3(true)
                }}
              >
                가격 제안하기
              </button>
            </div>
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
      {clickedSell && clickedSell === true ? (
        <div className="w-full flex justify-center">
          <form className="flex justify-center flex-col items-center" action="">
            <div className="mb-4">
              <p className="text-center mb-1">즉시 구매가 설정</p>
              <div className="flex">
                <input id="price" type="text" />
                <label htmlFor="price">MUNG</label>
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
                  />
                  <label htmlFor="yes">Yes</label>
                </div>

                <div>
                  <input type="radio" id="no" name="whatOffer" value="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>

            <div className="flex justify- center mt-5">
              <button
                type="submit"
                className="border border-black mr-5"
                onClick={() => {
                  setClickedSell(false)
                  setIsSelling(true)
                }}
              >
                판매 등록
              </button>

              <button
                className="border border-black"
                onClick={() => {
                  setClickedSell(false)
                }}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="h-[50%] w-full flex">
          <div className="w-[47.5%]">
            <p>거래 이력</p>
            <div className="w-full h-[90%] bg-white p-2">
              <div className="flex w-full border border-b-black">
                <p className="w-[20%]">Price</p>
                <p className="w-[20%]">From</p>
                <p className="w-[30%]">To</p>
                <p>Date</p>
              </div>
              {tradeList[0]?.tradeList.map(
                ({
                  sellerNickname,
                  sellerAddress,
                  buyerNickname,
                  buyerAddress,
                  date,
                  price,
                }: TradeListProp) => {
                  return (
                    <NftListItem2
                      sellerAddress={sellerAddress}
                      sellerNickname={sellerNickname}
                      buyerAddress={buyerAddress}
                      buyerNickname={buyerNickname}
                      date={date}
                      price={price}
                    />
                  )
                }
              )}
            </div>
          </div>
          <div className="w-[5%]"></div>
          <div className="w-[47.5%]">
            <p>오퍼 리스트</p>
            <div className="bg-white h-[90%] p-2">
              {tradeList ? (
                <div>
                  <div>
                    <div className="flex w-full border border-b-black">
                      <p className="w-[20%]">Price</p>
                      <p className="w-[20%]">From</p>
                      <p className="w-[30%]">Expiration</p>
                      <p>Date</p>
                    </div>
                  </div>

                  {tradeList[0]?.offerList.map(
                    ({
                      id,
                      buyerAddress,
                      buyerNickname,
                      price,
                      date,
                    }: OfferListProp) => {
                      return (
                        <div className="flex">
                          <p className="w-[20%]">{price}</p>
                          <p className="w-[20%]">{date}</p>
                          <p className="w-[30%]">{buyerNickname}</p>
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

export default NftDetail

//
// NFT 거래
// NFT 발급
// NFT
