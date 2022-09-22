import React, { useState } from "react"
import Modal from "./Modal"
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"
import { MUNGContract } from "../../utils/Web3Config"

// 어떤식으로 전역 모달을 놓아야 할지 고민중
// App.tsx에 넣을 예정
export default async function BalanceModal() {
  const [member] = useRecoilState(memberAtom)

  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  let balance = await MUNGContract.methods
    .balanceOf(member.walletAddress)
    .call()
  balance = balance * 10 ** -18
  return (
    <Modal isOpen={isOpen} modalClose={modalClose}>
      <p>나의 지갑 정보는 ?</p>
      <p>{balance} MUNG</p>
    </Modal>
  )
}
