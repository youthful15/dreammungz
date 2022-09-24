import NftList from "../components/nftList/NftList"

const NftListPage = () => {
  return (
    <div className="h-full ">
      <h1 className="mb-3 text-2xl font-bold h-[10%]">
        드림멍즈의 모든 강아지들{" "}
      </h1>
      <NftList useFilter={true} />
    </div>
  )
}

export default NftListPage
