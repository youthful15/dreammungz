import { RecoilRoot } from "recoil"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "tw-elements"
import ReactGA from "react-ga"

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID
ReactGA.initialize(TRACKING_ID!)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <RecoilRoot>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </RecoilRoot>
)
