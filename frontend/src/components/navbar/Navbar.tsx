import { Link, useNavigate, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import NavList from "./NavList"
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"
import { http } from "../../api/axios"
import { getBalance } from "../../utils/web3"
const navItemStyle: string =
  "bg-beige-200 rounded-lg shadow-sm cursor-pointer p-1 mb-1 border-2 border-lgBrown-500"

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
    <div className="h-full pb-2">
      <div className="h-[15%]">
        <NavLink to="/">
          <img className="p-1 pt-2" src="/dreammungz.svg" alt="logo" />
        </NavLink>
      </div>
      <nav className="flex flex-col justify-between w-full h-[85%] p-4 space-y-4 text-center mapleStory">
        <ul className="rounded-xl mt-2 pb-2 pt-1">
          <li>
            <button
              onClick={gameStart}
              className="flex justify-center w-full px-3 pb-3 pt-2 hover:scale-[110%]"
            >
              <img src="/images/start.png" alt="" className="" />
            </button>
          </li>

          <NavList />
        </ul>
        {isLogin ? (
          <div className="px-3">
            <Link
              to={`/personal/${localStorage.getItem("publicAddress")}/list`}
            >
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
          <div className="px-3">
            <div
              className={navItemStyle}
              onClick={() => {
                setLogin(true)
                navigate("/login")
              }}
            >
              로그인
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
