import { useState } from "react"
import { Link, useNavigate, NavLink } from "react-router-dom"
import NavList from "./NavList"
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"
import { MUNGContract } from "../../utils/Web3Config"
import { http } from "../../api/axios"

const navItemStyle: string =
  "bg-brown-300  border rounded-lg shadow-sm cursor-pointer"

const Navbar = () => {
  const navigate = useNavigate()
  const [member] = useRecoilState(memberAtom)
  const [isLogin, setLogin] = useState(false) // 추후 Recoil을 사용하여  상태관리 할 것

  // balance Test 확인 완료
  const clickBalance = async () => {
    let balance = await MUNGContract.methods
      .balanceOf(member.walletAddress)
      .call()
    balance = balance * 10 ** -18
    console.log(balance)
  }

  const startData = {
    address: "0x1", // 차후 실제 address로 변경 필요
    selection: "-1",
  }

  // 게임 시작 페이지로 이동 로직
  function gameStart() {
    console.log("address가 하드코딩 처리 되어있습니다.")
    http.post(`game/info`, startData).then((res) => {
      if (res.data.title) {
        navigate("/game")
      } else {
        navigate("/start")
      }
    })
  }

  return (
    <nav className="flex flex-col justify-between w-full h-full p-4 space-y-4 text-center">
      <ul>
        <li>
          <NavLink to="/">
            <img src="/dreammungz.svg" alt="logo" />
          </NavLink>
        </li>
        <li>
          <button onClick={gameStart} className="flex justify-center w-full">
            <img src="/paw.png" alt="" className="" />
          </button>
        </li>

        <NavList />
      </ul>
      {isLogin ? (
        <div>
          <Link to="/mypage/list">
            <div className={navItemStyle}>마이페이지 </div>
          </Link>
          <div
            className={navItemStyle}
            onClick={() => {
              clickBalance()
            }}
          >
            지갑 정보 보기
          </div>
          <div className={navItemStyle} onClick={() => setLogin(false)}>
            로그아웃
          </div>
        </div>
      ) : (
        <div className={navItemStyle} onClick={() => setLogin(true)}>
          <Link to="/login">로그인</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
