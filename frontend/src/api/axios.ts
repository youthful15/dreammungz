import axios from "axios"
function Instance() {
  const instance = axios.create({
    // 배포 주소: "https://j7a605.p.ssafy.io/api/"
    // local: "http://localhost:8081/"

    baseURL: "https://j7a605.p.ssafy.io/api/",
    headers: {
      "Content-type": "application/json",
    },
  })

  // 헤더에 토큰 등록
  // instance.interceptors.request.use(
  //   (config: any) => {
  //     config.headers["token"] = localStorage.getItem("token")
  //     return config
  //   },
  //   (err) => {
  //     return Promise.reject(err)
  //   }
  // )

  // response interceptor 요청 응답 받은 후 데이터 가공
  // instance.interceptors.response.use(
  //   (response) => {return response},
  //   async (error) => {
  //     const {
  //       config, response: { status },
  //     } = error
  //     const originalRequest = config
  //     if (status === 401 && !originalRequest._retry) {

  //       originalRequest._retry = true
  //     }
  //   }
  // )

  return instance
}
export const http = Instance()
/**
 * 사용방법 :
 * 사용하고자 하는 파일에서 임포트 : ex) import { http } from "../api/index"
 * 원하는 요청 수행 : ex) http.get("url") , http.post("url",data)
 */
