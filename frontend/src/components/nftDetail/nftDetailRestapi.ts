import { http } from "../../api/axios"

export const getNftDetail = async ({ tokenId }: { tokenId: number }) => {
  return await http.get(`trade/nft/${tokenId}`)
}
