import { useState } from "react"
import { NavLink } from "react-router-dom"
import NavList from "./NavList"

const Navbar = () => {
  const [isLogin, setLogin] = useState(false) // 추후 Recoil을 사용하여  상태관리 할 것
  return (
    <nav className="w-1/5 border bg-yellow-100 space-y-4 p-2 flex flex-col  justify-between">
      <div>
        <div className="border bg-red-200  h-24 ">로고 영역 </div>
        <div className="border bg-blue-200 h-24">시작 버튼 </div>
        <NavList />
      </div>

      {isLogin ? (
        <div>
          <div className="border bg-blue-400  cursor-pointer">
            지갑 정보 보기
          </div>
          <div
            className="border bg-purple-200  cursor-pointer"
            onClick={() => setLogin(false)}
          >
            로그아웃
          </div>
          <NavLink to="/mypage">
            <div className="border  my-2  bg-gray-200">마이페이지 </div>
          </NavLink>
        </div>
      ) : (
        <div
          className="border bg-green-200  cursor-pointer"
          onClick={() => setLogin(true)}
        >
          로그인
        </div>
      )}
    </nav>
  )
}

export default Navbar
