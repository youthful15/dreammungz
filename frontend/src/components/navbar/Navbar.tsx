import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import NavList from "./NavList"
import memberAtom from "../../recoil/member/atom"
import { useRecoilState } from "recoil"
import { MUNGContract } from "../../utils/Web3Config"

const navItemStyle: string =
  "bg-brown-300  border rounded-lg shadow-sm cursor-pointer"

const Navbar = () => {
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

  return (
    <nav className="flex flex-col justify-between w-full h-full p-4 space-y-4 text-center">
      <ul>
        <li>
          <NavLink to="/">
            <img src="/dreammungz.svg" alt="logo" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/start" className="flex justify-center w-full">
            <img src="/paw.png" alt="" className="" />
          </NavLink>
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
