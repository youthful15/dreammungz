import Filter from "../components/filter/Filter"
import { http } from "./axios"

const getNftList = async (filter: Filter) => {
  const { data } = await http.post("nft/list", filter)
  return data
}

const getDealHistory = async (address: string, page: number) => {
  const { data } = await http.get(`trade/address/${address}/page/${page}`)
  return data
}

export { getNftList, getDealHistory }
