import { useSetRecoilState } from "recoil"
import balanceAtom from "../recoil/balance/atom"
import { MUNGContract } from "../utils/Web3Config"

// getBalance
export const GetBalance = async () => {
  const recoilBalance = useSetRecoilState(balanceAtom)
  const walletAddress = localStorage.getItem("publicAddress")
  recoilBalance(await MUNGContract.methods.balanceOf(walletAddress).call())
}
