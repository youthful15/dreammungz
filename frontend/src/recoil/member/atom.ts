import { atom } from "recoil"

const memberAtom = atom({
  key: "memberAtom",
  default: {
    walletAddress: "WalletAddress",
    memberNickname: "Default",
    contractId: 0,
    walletBalance: 0,
  },
})

export default memberAtom
