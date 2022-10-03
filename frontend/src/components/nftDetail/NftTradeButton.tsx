import { useRecoilState } from "recoil"
import tradeAtom from "../../recoil/trade/atom"
import memberAtom from "../../recoil/member/atom"
import { getBalance } from "../../utils/web3"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()

  return (
    <>
      {nftOwnerAddress &&
      publicAddress?.toLowerCase() !== nftOwnerAddress?.toLowerCase() &&
      info.sell === true ? (
        nftOwnerAddress &&
        publicAddress?.toLowerCase() !== nftOwnerAddress?.toLowerCase() &&
        info.sell === true &&
        info.nego ? (
          <div className="flex">
            <button
              className="w-[50%] text-sm font-medium p-0.5 bg-beige-300 border-2 border-lgBrown-400 rounded-lg text-brown-400 mr-3 hover:scale-110"
              onClick={async () => {
                // 비로그인 접근
                if (!localStorage.getItem("publicAddress")) {
                  alert("먼저 메타마스크 로그인 해주시기 바랍니다.")
                  navigate("/login")
                }

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
              className="w-[50%] text-sm font-medium p-0.5 bg-beige-300 border-2 border-lgBrown-400 rounded-lg text-brown-400 hover:scale-110"
              onClick={async () => {
                // 비로그인 접근
                if (!localStorage.getItem("publicAddress")) {
                  alert("먼저 메타마스크 로그인 해주시기 바랍니다.")
                  navigate("/login")
                }

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
            className="w-[50%] text-sm font-medium p-0.5 bg-beige-300 border-2 border-lgBrown-400 rounded-lg text-brown-400 mr-3 hover:scale-110"
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
          className="w-full text-sm font-medium p-0.5 bg-beige-300 border-2 border-lgBrown-400 rounded-lg text-brown-400 hover:scale-110"
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
          className="w-full text-sm font-medium p-0.5 bg-beige-300 border-2 border-lgBrown-400 rounded-lg text-brown-400 hover:scale-110"
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
    </>
  )
}
