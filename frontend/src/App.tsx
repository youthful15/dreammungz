import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Sample from "./pages/Sample"
function App() {
  return (
    <div className="App w-screen h-screen flex justify-center items-center bg-blue-100">
      <div className="border w-4/5 h-4/5 flex bg-white">
        <Navbar />
        <div className="4/5 border w-full">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Sample />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
