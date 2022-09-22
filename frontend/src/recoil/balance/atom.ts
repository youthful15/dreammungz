import { atom } from "recoil"

const balanceAtom = atom({
  key: "balanceAtom",
  default: {
    walletBalance: localStorage?.getItem("publicAddress"),
  },
})

export default balanceAtom
