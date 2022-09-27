import React, { useState } from "react"
import Modal from "./Modal"
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"
import { MUNGContract } from "../../utils/Web3Config"
import { getBalance } from "../../utils/web3"
// 어떤식으로 전역 모달을 놓아야 할지 고민중
// App.tsx에 넣을 예정
export default async function BalanceModal() {
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  const balance = await getBalance()

  return (
    <Modal isOpen={isOpen} modalClose={modalClose}>
      <p>나의 지갑 정보는 ?</p>
      <p>{balance} MUNG</p>
    </Modal>
  )
}
