import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Sample from "./pages/Sample.js"
import AllNftListPage from "./pages/AllNftListPage"
import NftDetail from "./pages/NftDetail"
import GameStart from "./pages/GameStart"
import GamePlaying from "./pages/GamePlaying"

import MyPage from "./pages/MyPage"
import MyNftList from "./pages/MyNftList"
import MyNftHistory from "./pages/MyNftHistory"
function App() {
  return (
    <div className="App w-screen h-screen flex justify-center items-center bg-blue-100">
      <BrowserRouter>
        <div className="border w-4/5 h-4/5 flex bg-white">
          <Navbar />
          <div className="4/5 border w-full p-8">
            <Routes>
              <Route path="/" element={<Sample />} />
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
  )
}

export default App
