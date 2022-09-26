import { MUNGContract } from "./Web3Config"

export const getBalance = async () => {
  const walletAddress = localStorage.getItem("publicAddress")
  const balance = await MUNGContract.methods.balanceOf(walletAddress).call()
  return parseInt(balance * 10 ** -18)
}
