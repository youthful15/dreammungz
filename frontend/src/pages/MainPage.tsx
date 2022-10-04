import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { http } from "../api/axios"
import Carousel from "../components/carousel/Carousel"
import WarningToast from "../components/toast/WarningToast"
export default function MainPage() {
  const navigate = useNavigate()

  const info = {
    address: null,
    color: null,
    face: null,
    gender: null,
    hair: null,
    job: null,
    page: 0,
    sell: false,
    status: [],
    tier: null,
  }

  const [items, setItems] = useState([{ url: "", id: "" }])

  useEffect(() => {
    async function NFTlist() {
      await http.post("nft/list", info).then((res) => {
        console.log(res.data.items)
        setItems(res.data.items)
      })
    }
    NFTlist()
  }, [])

  return (
    <div className="w-full h-full">
      <WarningToast title="sdf" content="sdf" />
      <div className="h-[64%] py-1">
        <div className="h-[90px]">
          <div
            style={{
              backgroundImage: `url(/images/tutorial.png)`,
            }}
            className="h-full bg-center border-4 border-white rounded-3xl"
          ></div>
        </div>
        <div className="h-[280px] pt-6">
          <div className="h-full">
            <Carousel />
          </div>
        </div>
      </div>

      <div className="h-[35%]">
        <span className="font-semibold text-2xl h-[15%] mapleStory text-brown-500">
          취뽀 강아지를 소개합니다 🎉
        </span>
        <div className="h-[85%] flex w-full justify-between mt-4">
          {items.map((item, index) => {
            if (index <= 4)
              return (
                <img
                  className="w-[180px] h-[180px] hover:scale-110 cursor-pointer"
                  key={index}
                  src={`${item.url}`}
                  onClick={() => {
                    navigate(`/nft/detail/${item.id}`)
                  }}
                ></img>
              )
          })}
        </div>
      </div>
    </div>
  )
}
