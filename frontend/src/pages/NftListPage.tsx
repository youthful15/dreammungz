import NftList from "../components/nftList/NftList"
import tradeAtom from "../recoil/trade/atom"
import { useRecoilState } from "recoil"
import { useEffect } from "react"

const NftListPage = () => {
  // spinner 초기화
  const [, setTrade] = useRecoilState(tradeAtom)
  useEffect(() => {
    async function spinnerInitialize() {
      await setTrade((prev) => {
        const variable = { ...prev }
        variable.modalOpen6 = false
        return { ...variable }
      })
      spinnerInitialize()
    }
  }, [])
  return (
    <div className="h-full overflow-hidden mapleStory text-lgBrown-700">
      <h1 className="mb-4 text-2xl font-bold h-[10%] flex items-start ">
        드림멍즈의 모든 강아지들{" "}
      </h1>
      <NftList useFilter={true} />
    </div>
  )
}

export default NftListPage
