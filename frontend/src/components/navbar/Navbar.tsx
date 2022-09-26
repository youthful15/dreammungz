import { Link, useNavigate, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import NavList from "./NavList"
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"
import { http } from "../../api/axios"
import { getBalance } from "../../utils/web3"
const navItemStyle: string =
  "bg-brown-300  border rounded-lg shadow-sm cursor-pointer"

const Navbar = () => {
  const navigate = useNavigate()
  const [member] = useRecoilState(memberAtom)
  const [isLogin, setLogin] = useState(false) // 추후 Recoil을 사용하여  상태관리 할 것
  const [balance, setBalance] = useState(0)
  const [showBalance, setShowBalance] = useState(false)

  // 로그인했는지 확인
  useEffect(() => {
    if (localStorage.getItem("publicAddress")) setLogin(true)
  }, [])

  // 지갑 정보 변경
  useEffect(() => {
    setTimeout(() => {
      setShowBalance(false)
    }, 5000)
  }, [showBalance])

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
            onClick={async () => {
              const receivedBalance = await getBalance()
              setShowBalance(true)
              setBalance(receivedBalance)
            }}
          >
            {showBalance ? (
              <p className="text-xl font-semibold text-white">{balance} M</p>
            ) : (
              "지갑 보기"
            )}
          </div>
          <div
            className={navItemStyle}
            onClick={() => {
              localStorage.clear()
              setLogin(false)
              navigate("/mainpage")
            }}
          >
            로그아웃
          </div>
        </div>
      ) : (
        <div
          className={navItemStyle}
          onClick={() => {
            setLogin(true)
            navigate("/login")
          }}
        >
          로그인
        </div>
      )}
    </nav>
  )
}

export default Navbar
