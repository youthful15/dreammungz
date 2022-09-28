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
      {nftOwnerAddress &&
      publicAddress?.toLowerCase() !== nftOwnerAddress?.toLowerCase() &&
      info.sell === true ? (
        nftOwnerAddress &&
        publicAddress?.toLowerCase() !== nftOwnerAddress?.toLowerCase() &&
        info.sell === true &&
        info.nego ? (
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
        ) : nftOwnerAddress &&
          publicAddress?.toLowerCase() !== nftOwnerAddress?.toLowerCase() &&
          info.sell === true &&
          info.nego === false ? (
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
        ) : null
      ) : nftOwnerAddress &&
        publicAddress?.toLowerCase() === nftOwnerAddress?.toLowerCase() &&
        info.sell === true ? (
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
      ) : nftOwnerAddress &&
        publicAddress?.toLowerCase() === nftOwnerAddress?.toLowerCase() &&
        info.sell === false ? (
        <button
          className="w-full border border-black"
          onClick={() => {
            setTrade((prev) => {
              const variable = { ...prev }
              variable.isSellingForm = true
              variable.modalOpen8 = true
              return { ...variable }
            })
          }}
        >
          판매 시작
        </button>
      ) : null}
    </div>
  )
}
