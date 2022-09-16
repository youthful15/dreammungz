import { useState } from "react"
import NftList from "../components/nftList/NftList"

const filterForm: filterType = {
  job: [],
  hair: [],
  color: [],
  face: [],
  gender: [],
  tier: [],
  stat: [],
}

interface CategoryProp {
  type: string
  addFilter: (category: string, item: listItemType) => void
}
interface listItemType {
  kor: string
  eng: string
}

const Category = ({ type, addFilter }: CategoryProp) => {
  const list: listItemType[] = filter[type]
  return (
    <div className="border m-1  bg-gray-100  flex">
      <div>{type}</div>
      <div className="flex flex-wrap">
        {list.map((item, i) => {
          return (
            <div
              className="bg-blue-300 m-1"
              onClick={() => addFilter(type, item)}
              key={i}
            >
              {item.kor}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const NftListPage = () => {
  const [showFilterSelector, setShowFilterSelector] = useState(false)
  const [filters, setFilters] = useState(filterForm)

  const addFilter = (category: string, item: listItemType) => {
    const newFilterItems = { ...filters }
    const idx = newFilterItems[category].findIndex(
      (filter) => filter.eng === item.eng
    )
    if (idx >= 0) return
    newFilterItems[category].push(item)

    setFilters(newFilterItems)
  }

  const removeFilter = (category: string, item: listItemType) => {
    const newFilterItems = { ...filters }
    const idx = newFilterItems[category].findIndex(
      (filter) => filter.eng === item.eng
    )

    newFilterItems[category].splice(idx, 1)
    setFilters(newFilterItems)
  }

  return (
    <div className="h-full relative">
      nft리스트 페이지
      <div className="flex">
        {Object.keys(filter).map((item) => {
          const list = filters[item]?.map((f, i) => (
            <div className="bg-gray-100 m-0.5" key={i}>
              {f.kor}
              <span onClick={() => removeFilter(item, f)}>X</span>
            </div>
          ))
          return list
        })}
      </div>
      <div
        className="w-20 bg-green-300"
        onClick={() => setShowFilterSelector((prev) => !prev)}
      >
        필터 설정
      </div>
      {showFilterSelector && (
        <div className="bg-orange-300 absolute ">
          <div onClick={() => setShowFilterSelector(false)}>
            필터 선택창 닫기{" "}
          </div>
          <Category type="job" addFilter={addFilter} />
          <Category type="hair" addFilter={addFilter} />
          <Category type="color" addFilter={addFilter} />
          <Category type="face" addFilter={addFilter} />
          <Category type="gender" addFilter={addFilter} />
          <Category type="tier" addFilter={addFilter} />
          <Category type="stat" addFilter={addFilter} />
        </div>
      )}
      <NftList type="test" />
    </div>
  )
}

export default NftListPage
const job_list: listItemType[] = [
  { kor: "왕", eng: "KING" },
  { kor: "우주비행사", eng: "ASTRONAUT" },
  { kor: "운동선수", eng: "ATHLETE" },
  { kor: "의사", eng: "DOCTOR" },
  { kor: "경찰", eng: "POLICE" },
  { kor: "요리사", eng: "CHEF" },
  { kor: "아이돌", eng: "IDOL" },
  { kor: "개발자", eng: "DEVELOPER" },
  { kor: "멍피아", eng: "MUNGPIA" },
  { kor: "선생님", eng: "TEACHER" },
  { kor: "판사", eng: "JUDGE" },
  { kor: "괴도", eng: "MYSTERIOUS_THIEF" },
  { kor: "여행자", eng: "TRAVELER" },
  { kor: "화가", eng: "ARTIST" },
  { kor: "과학자", eng: "SCIENTIST" },
  { kor: "청소부", eng: "JANITOR" },
  { kor: "기자", eng: "REPORTER" },
  { kor: "건물주", eng: "BUILDING_OWNER" },
  { kor: "성악가", eng: "VOCALIST" },
  { kor: "조각가", eng: "SCULPTOR" },
  { kor: "무명작가", eng: "UNKNOWN_AUTHOR" },
  { kor: "유튜버", eng: "YOUTUBER" },
  { kor: "보디가드", eng: "BODYGUARD" },
  { kor: "점술사", eng: "FORTUNE_TELLER" },
  { kor: "도둑", eng: "THIEF" },
  { kor: "철학자", eng: "PHILOSOPHER" },
  { kor: "농부", eng: "FARMER" },
  { kor: "백수", eng: "JOBLESS" },
]
const hair_list: listItemType[] = [
  { kor: "직모", eng: "ORIGINAL" },
  { kor: "곱슬", eng: "CURLY" },
]

const tier_list: listItemType[] = [
  { kor: "노멀", eng: "NORMAL" },
  { kor: "레어", eng: "RARE" },
  { kor: "에픽", eng: "EPIC" },
  { kor: "유니크", eng: "UNIQUE" },
  { kor: "레전더리", eng: "LEGENDARY" },
]

const color_list: listItemType[] = [
  { kor: "하양", eng: "WHITE" },
  { kor: "검정", eng: "BLACK" },
  { kor: "갈색", eng: "BROWN" },
  { kor: "빨강", eng: "RED" },
  { kor: "노랑", eng: "YELLOW" },
  { kor: "초록", eng: "GREEN" },
  { kor: "파랑", eng: "BLUE" },
  { kor: "분홍", eng: "PINK" },
  { kor: "주황", eng: "ORANGE" },
  { kor: "보라", eng: "PURPLE" },
  { kor: "황금", eng: "GOLD" },
  { kor: "무지개", eng: "RAINBOW" },
]

const face_list: listItemType[] = [
  { kor: "기본", eng: "BASIC" },
  { kor: "화남", eng: "ANGRY" },
  { kor: "눈물", eng: "SAD" },
  { kor: "반눈", eng: "HALF" },
  { kor: "콩눈", eng: "BEAN" },
  { kor: "짱구", eng: "ZZANG" },
  { kor: "사납", eng: "SCAR" },
  { kor: "윙크", eng: "WINK" },
  { kor: "안경", eng: "GLASSES" },
  { kor: "샤이", eng: "SHY" },
]

const gender_list: listItemType[] = [
  { kor: "남자", eng: "M" },
  { kor: "여자", eng: "F" },
]

const stat_list: listItemType[] = [
  { kor: "튼튼함", eng: "STOUTNESS" },
  { kor: "영리함", eng: "CLEVER" },
  { kor: "재빠름", eng: "QUICK" },
  { kor: "직감", eng: "INTUITION" },
  { kor: "카리스마", eng: "CHARISMA" },
  { kor: "인기", eng: "POPULARITY" },
  { kor: "감수성", eng: "SENSIBILITY" },
  { kor: "발재주", eng: "FOOTWORK" },
  { kor: "목청", eng: "VOICE" },
  { kor: "재력", eng: "WEALTH" },
  { kor: "정의로움", eng: "JUSTICE" },
  { kor: "귀여움", eng: "CUTE" },
]

interface filterType {
  [index: string]: listItemType[]
}
const filter: filterType = {
  job: job_list,
  hair: hair_list,
  color: color_list,
  face: face_list,
  gender: gender_list,
  tier: tier_list,
  stat: stat_list,
}
