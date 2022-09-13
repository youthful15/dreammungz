interface NftListItemProp {
  img: string
  info: JSX.Element
  status: JSX.Element
}

const NftListItem = ({ img, info, status }: NftListItemProp) => {
  return (
    <div>
      <div>이미지</div>
      <div>정보</div>
      <div>상태 </div>
    </div>
  )
}

export default NftListItem
