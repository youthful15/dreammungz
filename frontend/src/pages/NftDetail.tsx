import React, { useState } from "react"
import NftListItem2 from "../components/nftList/NftListItem2"

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
  const [myNft, setMyNft] = useState(false)
  const [isSelling, setIsSelling] = useState(false)
  const [clickedSell, setClickedSell] = useState(false)

  return (
    <div className="h-full w-full">
      <div className="h-[50%] w-full flex">
        <div className="w-[50%]">
          <img
            className="w-[250px] h-[250px] bg-white"
            src=""
            alt="NFT 이미지"
          />
        </div>
        <div className="w-[50%]">
          <p>DREAMMUNGS</p>
          <p>Tags</p>
          <p>500 SSF</p>
          <p>분양자</p>
          <p>Unique</p>
          {myNft && myNft === true ? (
            <div className="flex">
              <button className="border border-black mr-3">즉시 구매가</button>
              <button className="border border-black">가격 제안하기</button>
            </div>
          ) : (
            <div className="flex">
              {isSelling && isSelling === true ? (
                // 본인 NFT && 판매중인 경우
                <button className="w-full border border-black">
                  판매 중지
                </button>
              ) : (
                // 본인 NFT && 판매 올리지 않았을 경우
                <button className="w-full border border-black">
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
                <label htmlFor="price">SSF</label>
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

            <button type="submit" className="mt-5 border border-black">
              판매 등록
            </button>
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
