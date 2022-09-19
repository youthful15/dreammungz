import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import NavList from "./NavList"
import Login from "../login/Login"
import Web3 from "web3"
import { ssafyContractAddress, ERC20ABI } from "../../utils/web3"
const navItemStyle: string = "bg-brown-300  border rounded-lg shadow-sm"

const Navbar = () => {
  const web3: any = new Web3(window.ethereum)
  const [showbalance, setShowBalance] = useState()
  const [isLogin, setLogin] = useState(false) // 추후 Recoil을 사용하여  상태관리 할 것

  return (
    <nav className="flex flex-col justify-between w-full h-full p-2 space-y-4 text-center">
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
          <div className={navItemStyle}>지갑 정보 보기</div>
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
