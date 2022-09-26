import { atom } from "recoil"

const playingMusic = atom({
  key: "playingMusic",
  default: "Default",
})

export const playingNow = atom({
  key: "playingNow",
  default: false,
})

export default playingMusic
