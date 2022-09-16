const statusName = {
  STOUTNESS: "튼튼함",
  CLEVER: "영리함",
  QUICK: "재빠름",
  INTUITION: "직감",
  CHARISMA: "용기",
  POPULARITY: "인기",
  SENSIBILITY: "감수성",
  FOOTWORK: "발재주",
  VOICE: "목청",
  WEALTH: "재력",
}

const findKOR = (status) => {
  return statusName[status]
}

export default findKOR
