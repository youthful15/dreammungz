import { NavLink } from "react-router-dom"
import LoginButton from "../components/login/Login"

const Login = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div>
        <button>
          <LoginButton />
        </button>
        <NavLink to="/login-tutorial">
          <p className="mt-1 hover:text-blue-300">
            지갑이 없다면? 만드는법 보기
          </p>
        </NavLink>
      </div>
    </div>
  )
}

export default Login
