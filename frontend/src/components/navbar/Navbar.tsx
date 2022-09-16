import { useState } from "react"
import { NavLink } from "react-router-dom"
import NavList from "./NavList"
import Login from "../login/Login"

const navItemStyle: string =
  "py-1 my-2 bg-pink-500 border rounded-lg shadow-sm border-brown-200 text-brown"

const Navbar = () => {
  const [isLogin, setLogin] = useState(false) // 추후 Recoil을 사용하여  상태관리 할 것
  return (
    <nav className="flex flex-col justify-between w-full h-full p-2 space-y-4 ">
      <NavLink to="/">
        <img src="/dreammungz.svg" alt="logo" />
      </NavLink>
      <NavLink to="/start" className="flex justify-center w-full">
        <img src="/paw.png" alt="" className="" />
      </NavLink>

      <NavList navItemStyle={navItemStyle} />

      {isLogin ? (
        <div>
          <NavLink to="/mypage/list">
            <div className={navItemStyle}>마이페이지 </div>
          </NavLink>
          <div className={navItemStyle}>지갑 정보 보기</div>
          <div className={navItemStyle} onClick={() => setLogin(false)}>
            로그아웃
          </div>
        </div>
      ) : (
        <div className={navItemStyle} onClick={() => setLogin(true)}>
          <NavLink to="/login">로그인</NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar
