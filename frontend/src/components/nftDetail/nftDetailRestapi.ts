import { http } from "../../api/axios"
export const getNftDetail = async ({ nftId }: { nftId: number }) => {
  await http.get(`nft/id/${nftId}`)
}
