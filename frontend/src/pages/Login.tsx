import { NavLink } from "react-router-dom"
import LoginButton from "../components/login/Login"
import SpinnerModal from "../components/modal/SpinnerModal"
import Spinner from "../components/spinner/Spinner"
import tradeAtom from "../recoil/trade/atom"
import { useRecoilState } from "recoil"

const Login = () => {
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res: any) => console.log(res))
  const [trade, setTrade] = useRecoilState(tradeAtom)
  return (
    <div className="h-full w-full flex justify-center items-center">
      {/* 스피너 모달 시작 */}
      <SpinnerModal
        isOpen={trade.modalOpen6}
        modalClose={() => {
          setTrade((prev) => {
            const variable = { ...prev }
            variable.modalOpen6 = false
            return { ...variable }
          })
        }}
      >
        <Spinner />
      </SpinnerModal>
      {/* 스피너 모달 끝 */}
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
