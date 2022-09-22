import { atom } from "recoil"

const memberAtom = atom({
  key: "memberAtom",
  default: {
    walletAddress: "WalletAddress",
    memberNickname: "Default",
  },
})

export default memberAtom
