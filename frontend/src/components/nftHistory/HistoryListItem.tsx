interface HistoryItem {
  id: number
  url: string
  type: string
  sellerNickname: string
  sellerAddress: string
  buyerNickname: string
  buyerAddress: string
  date: string
  price: string
}

const HistoryItem = ({ ...props }) => {
  const {
    id,
    url,
    type,
    sellerNickname,
    sellerAddress,
    buyerNickname,
    buyerAddress,
    date,
    price,
  } = props.item

  return (
    <tr className="bg-white border">
      <td className="">{id}</td>
      <td>{type}</td>
      <td>{price}</td>
      <td>{type === "BUY" ? sellerNickname : buyerNickname}</td>
      <td>{date}</td>
    </tr>
  )
}

export default HistoryItem
