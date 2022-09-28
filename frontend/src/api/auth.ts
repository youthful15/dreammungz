import { http } from "./axios"

const getUserNickname = async (address: string) => {
  const { data } = await http.get(`auth/info/nickname/${address}`)
  return data
}

const setNewNickname = async (address: string, nickname: string) => {
  const data = await http.put(`auth/info/nickname`, { address, nickname })
  return data
}

export { getUserNickname, setNewNickname }
