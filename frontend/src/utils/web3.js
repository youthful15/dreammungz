import { MUNGContract, MUNGContractAddress, web3 } from "./Web3Config"

export const getBalance = async () => {
  const walletAddress = localStorage.getItem("publicAddress")
  const balance = await MUNGContract.methods.balanceOf(walletAddress).call()
  return parseInt(balance * 10 ** -18)
}

export const pushGameStart = async (publicAddress, cost) => {
  console.log(1)
  await MUNGContract.methods
    .approve(publicAddress, web3.utils.toBN(cost * 10 ** 18).toString())
    .send({ from: publicAddress })
  console.log(2)
  await MUNGContract.methods
    .transferFrom(
      publicAddress,
      MUNGContractAddress,
      web3.utils.toBN(cost * 10 ** 18).toString()
    )
    .send({ from: publicAddress })
  console.log(3)
}
