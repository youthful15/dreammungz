import Filter from "../components/filter/Filter"
import { http } from "./axios"

const getNftList = async (filter: Filter) => {
  const { data } = await http.post("nft/list", filter)
  return data
}

export { getNftList }
