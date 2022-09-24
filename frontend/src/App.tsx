import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import RouterChangeTracker from "./utils/RouteChangeTracker.js"

import MusicPlayer from "./components/music/MusicPlayer"

import Navbar from "./components/navbar/Navbar"
import Sample from "./pages/Sample"
import MainPage from "./pages/MainPage"
import NftDetail from "./pages/NftDetail"
import GameStart from "./pages/GameStart"
import GamePlaying from "./pages/GamePlaying"
import GameEnding from "./pages/GameEnding"

import MyPage from "./pages/MyPage"
import MyNftList from "./pages/MyNftList"
import MyNftHistory from "./pages/MyNftHistory"
import Login from "./pages/Login"
import LoginTutorial from "./pages/LoginTutorial"
import NftListPage from "./pages/NftListPage"

function App() {
  RouterChangeTracker()
  return (
    <div
      style={{
        backgroundImage: `url(/images/background.png)`,
      }}
      className="relative flex items-center justify-center w-screen h-screen bg-center bg-cover"
    >
      <MusicPlayer />

      <div className="flex items-center justify-center bg-white shadow-2xl rounded-2xl w-[1295px] h-[715px] relative">
        <div className="flex rounded-xl w-[1280px] h-[700px]">
          <div className="w-[230px] bg-brown-200 rounded-l-xl">
            <Navbar />
          </div>
          <div className="w-[1050px] p-8  bg-beige-200 rounded-r-xl">
            <Routes>
              <Route path="/" element={<Navigate replace to="/mainPage" />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login-tutorial" element={<LoginTutorial />} />
              <Route path="/styles" element={<Sample />} />
              <Route path="/start" element={<GameStart />} />
              <Route path="/game" element={<GamePlaying />} />
              <Route path="/ending" element={<GameEnding />} />
              <Route path="/nft">
                <Route path="list" element={<NftListPage />} />
                <Route path="detail/:id" element={<NftDetail />} />
              </Route>
              <Route path="/mypage" element={<MyPage />}>
                <Route path="list" element={<MyNftList />} />
                <Route path="history" element={<MyNftHistory />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
