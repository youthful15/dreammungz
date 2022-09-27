import { useRecoilState } from "recoil"
import tradeAtom from "../../recoil/trade/atom"
import memberAtom from "../../recoil/member/atom"
import { getBalance } from "../../utils/web3"
export default function NftTradeButton({
  nftOwnerAddress,
  publicAddress,
  info,
}: {
  nftOwnerAddress: string
  publicAddress: string
  info: any
}) {
  const [trade, setTrade] = useRecoilState(tradeAtom)
  const [member, setMember] = useRecoilState(memberAtom)

  return (
    <div>
      {/* TEST CODE */}

      {/* 환불 됨 */}
      {/* <button
    onClick={async () => {
      const saleId = 1
      const negoId = 1

      await MFTSaleFactoryContract.methods
        .refundNego(saleId, negoId, publicAddress)
        .send({ from: publicAddress })
        .then((res: any) => console.log(res))
    }}
  >
    네고 환불종민이만 눌르자
  </button> */}
      <button
        className="border border-black"
        onClick={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen4 = true
            return { ...variable }
          })
        }}
      >
        네고 취소
      </button>
      <button
        className="border border-black"
        onClick={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen5 = true
            return { ...variable }
          })
        }}
      >
        네고 승낙
      </button>
      {/* TEST CODE */}
      {/* TEST CODE */}
      <div>
        {/* 본인 NFT 인지 확인 */}
        {nftOwnerAddress &&
        publicAddress?.toLowerCase() !== nftOwnerAddress?.toLowerCase() ? (
          info.sell === true ? (
            <div className="flex">
              <button
                className="border border-black mr-3"
                onClick={async () => {
                  const receivedBalance = await getBalance()
                  await setMember((prev) => {
                    const variable = { ...prev }
                    variable.walletBalance = receivedBalance
                    return { ...variable }
                  })

                  setTrade((prev) => {
                    const variable = { ...prev }
                    variable.modalOpen2 = true
                    return { ...variable }
                  })
                }}
              >
                즉시 구매
              </button>
              <button
                className="border border-black"
                onClick={async () => {
                  const receivedBalance = await getBalance()
                  await setMember((prev) => {
                    const variable = { ...prev }
                    variable.walletBalance = receivedBalance
                    return { ...variable }
                  })

                  setTrade((prev) => {
                    const variable = { ...prev }
                    variable.modalOpen3 = true
                    return { ...variable }
                  })
                }}
              >
                가격 제안하기
              </button>
            </div>
          ) : null
        ) : (
          <div className="flex">
            {info.sell === true ? (
              // 본인 NFT && 판매중인 경우
              <button
                className="w-full border border-black"
                onClick={() => {
                  setTrade((prev) => {
                    const variable = { ...prev }
                    variable.modalOpen1 = true
                    return { ...variable }
                  })
                }}
              >
                판매 중지
              </button>
            ) : (
              // 본인 NFT && 판매 올리지 않았을 경우
              <button
                className="w-full border border-black"
                onClick={() => {
                  setTrade((prev) => {
                    const variable = { ...prev }
                    variable.isSellingForm = true
                    return { ...variable }
                  })
                }}
              >
                판매 시작
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
