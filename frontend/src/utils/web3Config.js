// Smart Contract
import Web3 from "web3"

export const web3 = new Web3(window.ethereum)
export const IERC20Contract = new web3.eth.Contract(IERC20ABI, IERC20Address)
