import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Modal from "../components/modal/Modal"
import TransactionHistory from "../components/nftDetail/TransactionHistory"
import {
  MUNGContract,
  MFTSaleFactoryContract,
  MFTContract,
  MFTSaleFactoryContractAddress,
} from "../utils/Web3Config"
import { http } from "../api/axios"
import NFTImage from "../components/nftDetail/NFTImage"

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

export default function NftDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const tokenId = parseInt(location.pathname.split("/")[3])
  const publicAddress = localStorage.getItem("publicAddress")

  // 판매 등록 정보
  const [negoAble, setNegoAble] = useState(true)
  const [buyNowPrice, setbuyNowPrice] = useState(0)

  const [balance, setBalance] = useState(0) // 본인 지갑
  const cost = 400

  const [myNft, setMyNft] = useState(true) // 본인 NFT 인지 확인
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

  // 지갑안에 들어있는 MUNG 가져오기
  const getMung = async () => {
    const walletAddress = localStorage.getItem("publicAddress")
    const needRecoil = await MUNGContract.methods
      .balanceOf(walletAddress)
      .call()
    setBalance(needRecoil * 10 ** -18)
  }

  // NFT 네고 제안 취소 -------------------------------------------------------------------------
  // const cancelNego = async () => {
  //   // console.log(MFTSaleFactoryContract.methods)

  //   await http.put("trade/cancelRegister", {
  //     address: publicAddress,
  //     contractId: "???",
  //     tokenId: tokenId,
  //   })
  // }

  // NFT 즉시 구매 -------------------------------------------------------------------------
  const buyNowFormat = async () => {
    // 금액이 부족할때
    if (balance < cost) {
      await alert("돈이 없습니다.")
      modalClose2()
    }

    // 금액이 충분할때
    else {
      // console.log(MFTSaleFactoryContract.methods)

      http.post("trade/nftPurchase", {
        address: publicAddress,
        contractId: "",
        tokenId: tokenId,
      })

      alert("구매 하는 중입니다.")
      await modalClose2()
      setIsSelling(false)
      navigate("/nft/list") // 즉시 구매시 nft list page로 redirect
    }
  }

  // NFT 네고 제안 -------------------------------------------------------------------------
  const proposalFormat = async () => {
    // 금액이 부족할때
    if (balance < cost) {
      await alert("돈이 없습니다.")
      modalClose3()
    }

    // 금액이 충분할때
    else {
      // console.log(MFTSaleFactoryContract.methods)

      // await http
      //   .post("trade/offerRegister", {
      //     address: publicAddress,
      //     contractId: "??",
      //     price: 1,
      //     tokenId: tokenId,
      //   })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.error(err))

      await alert("구매 하는 중입니다.")
      modalClose3()
      setIsSelling(false)
      navigate("/nft/list")
    }
  }

  // NFT 네고 제안 수락 -------------------------------------------------------------------------
  // const acceptNego = async () => {
  //   // console.log(MFTSaleFactoryContract.methods)

  //   await http.post("trade/offerAccept", {
  //     contractId: "??",
  //     tokenId: tokenId,
  //   }).then((res) => console.log(res))
  //   .catch((err) => console.error(err))
  // }

  // NFT 판매 등록 -------------------------------------------------------------------------
  const sellFormat = async () => {
    const startedAt = new Date() // 20220923
      .toISOString()
      .substring(0, 10)
      .replace(/-/g, "")

    console.log()
    // 판매 Smart Contract
    try {
      // 권한 부여
      MFTContract.methods
        .setApprovalForAll(MFTSaleFactoryContractAddress, true)
        .send({ from: publicAddress })

      const contractId = await MFTSaleFactoryContract.methods
        .createSale(
          tokenId,
          publicAddress,
          buyNowPrice,
          parseInt(startedAt),
          negoAble
        )
        .send({ from: publicAddress })
        .then((res: any) => console.log("CCCC", res))
      console.log("제발", contractId) // contract ID

      // await http
      //   .post(`trade/register`, {
      //     address: publicAddress,
      //     contractId: 1, // contractId
      //     negoAble: negoAble,
      //     price: buyNowPrice,
      //     tokenId: tokenId,
      //   })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.error(err))
    } catch (err) {
      console.error("판매 등록 에러", err)
    }
  }

  // NFT 판매 중단 -------------------------------------------------------------------------
  const sellAbort = async () => {
    // console.log(MFTSaleFactoryContract.methods)
    // await http
    //   .put("trade/nftShop", {
    //     address: publicAddress,
    //     contractId: "",
    //     tokenId: tokenId,
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.error(err))
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
        <p className="mb-4">즉시 구매 가격: {cost}</p>
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
        <NFTImage />

        <div className="w-[50%]">
          <p>DREAMMUNGS</p>
          <p>Tags</p>
          <p>500 MUNG</p>
          <p>분양자</p>
          <p>Unique</p>

          {/* 본인 NFT 인지 확인 */}
          {myNft === false ? (
            <div className="flex">
              <button
                className="border border-black mr-3"
                onClick={() => {
                  setOpen2(true)
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
                onClick={() => {
                  sellFormat()
                  // await setClickedSell(false)
                  // await setIsSelling(true)
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
          </div>
        </div>
      ) : (
        <div className="h-[50%] w-full flex">
          <TransactionHistory />
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
                        <div className="flex" key={id}>
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
