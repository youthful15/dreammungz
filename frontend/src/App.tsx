import { RecoilRoot } from "recoil"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Sample from "./pages/Sample"
import MainPage from "./pages/MainPage"
import AllNftListPage from "./pages/AllNftListPage"
import NftDetail from "./pages/NftDetail"
import GameStart from "./pages/GameStart"
import GamePlaying from "./pages/GamePlaying"

import MyPage from "./pages/MyPage"
import MyNftList from "./pages/MyNftList"
import MyNftHistory from "./pages/MyNftHistory"
import Login from "./pages/Login"
import LoginTutorial from "./pages/LoginTutorial"

function App() {
  return (
    <RecoilRoot>
      <div className="flex items-center justify-center w-screen h-screen text-center bg-beige-300">
        <BrowserRouter>
          <div className="flex w-4/5 shadow-lg rounded-xl h-4/5 ">
            <div className="w-1/5 bg-brown-200 rounded-l-xl">
              <Navbar />
            </div>
            <div className="w-full p-8 border 4/5 bg-beige-200 rounded-r-xl">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-tutorial" element={<LoginTutorial />} />

                <Route path="/styles" element={<Sample />} />
                <Route path="/start" element={<GameStart />} />
                <Route path="/game" element={<GamePlaying />} />
                <Route path="/nft">
                  <Route path="list" element={<AllNftListPage />} />
                  <Route path="detail/:id" element={<NftDetail />} />
                </Route>
                <Route path="/mypage" element={<MyPage />}>
                  <Route path="list" element={<MyNftList />} />
                  <Route path="history" element={<MyNftHistory />} />
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  )
}

export default App
