import TradeHistory from "./TradeHistory"
import OfferHistory from "./OfferHistory"

export default function History({
  nftInfo,
  publicAddress,
}: {
  nftInfo: any
  publicAddress: string
}) {
  return (
    <div className="h-[50%] w-full flex">
      <TradeHistory info={nftInfo} />
      <div className="w-[5%]"></div>

      <OfferHistory info={nftInfo} publicAddress={publicAddress} />
    </div>
  )
}
