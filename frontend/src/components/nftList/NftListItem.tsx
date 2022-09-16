interface NftListItemProp {
  img: string
  info?: JSX.Element | null
  status?: JSX.Element | null
}

const NftListItem = ({ img, info, status }: NftListItemProp) => {
  return (
    <div className="border ">
      <div className="bg-pink-200 w-24 h-24">이미지 </div>
      <div>{info}</div>
      <div>{status} </div>
    </div>
  )
}

export default NftListItem
