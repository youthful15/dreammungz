import { http } from "./axios"
const filter = {
  job: null,
  hair: null,
  tier: null,
  color: null,
  gender: null,
  face: null,
  sell: false,
  status: [],
  page: 0,
  address: null,
}

const getNftList = async (page: number) => {
  const { data } = await http.post("nft/list", { ...filter, page })
  return data
}

export { getNftList }
