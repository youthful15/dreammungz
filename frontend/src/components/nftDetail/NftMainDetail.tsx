interface NftMainDetailProp {}
export default function NftMainDetail(info: any) {
  return (
    <div>
      <p className="text-xl font-semibold">직업: {info.info.nft.job}</p>
      <p className="text-xl font-semibold">성별: {info.info.nft.gender}</p>
      <p className="text-xl font-semibold">Tags</p>
      <div className="flex">
        {info.info.nft.status.map((res: any, index: number) => {
          return (
            <p
              key={index}
              className="border border-pink-500
      pr-2"
            >
              {res.name} {res.value}
            </p>
          )
        })}
      </div>
      <p className="text-xl font-semibold">등급: {info.info.nft.tier}</p>
      {info.info.sell === true ? (
        <div>
          <p className="text-xl font-semibold">
            분양자: {info.info.sellerNickname}
          </p>
          <p className="text-xl font-semibold">{info.info.price} M</p>
        </div>
      ) : (
        <div>
          <p className="text-xl font-semibold">
            보유자: {info.info.sellerNickname}
          </p>
        </div>
      )}
    </div>
  )
}
