import axios from "axios"
function Instance() {
  const instance = axios.create({
    // process.env.REACT_APP_BASE_URL 추가 예정
    // 배포 주소: "https://j7a605.p.ssafy.io/api/"
    // local: "http://localhost:8081/"

    baseURL: "https://j7a605.p.ssafy.io/api/",
    headers: {
      "Content-type": "application/json",
    },
  })
  return instance
}
export const http = Instance()
/**
 * 사용방법 :
 * 사용하고자 하는 파일에서 임포트 : ex) import { http } from "../api/index"
 * 원하는 요청 수행 : ex) http.get("url") , http.post("url",data)
 */
