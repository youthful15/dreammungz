import { Link, useNavigate, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
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

  // 로그인했는지 확인
  useEffect(() => {
    if (localStorage.getItem("publicAddress")) setLogin(true)
  }, [])

  // balance Test 확인 완료
  const clickBalance = async () => {
    const balance = await MUNGContract.methods
      .balanceOf(localStorage.getItem("publicAddress"))
      .call()
    // let balance = await MUNGContract.methods
    //   .balanceOf(member.walletAddress)
    //   .call()
    console.log(balance * 10 ** -18)
  }

  const publicAddress = localStorage.getItem("publicAddress")

  const startData = {
    address: publicAddress,
    selection: "-1",
  }

  // 게임 시작 페이지로 이동 로직
  async function gameStart() {
    await http
      .get(`game/info/${localStorage.getItem("publicAddress")}`)
      .then((res) => {
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
