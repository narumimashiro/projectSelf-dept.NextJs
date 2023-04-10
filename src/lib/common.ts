export const sortInDateOrder = (list: any) => {
  // 日付パラメータが無い場合はそのまま返す
  if(list.date == "undefined") {
    console.error("we cannnot sort list")
    console.error("list not include 'date' parameter")
    return list
  }

  const len = list.length

  // dateがstring型
  for(let i = 0; i < len - 1; ++i) {
    for(let n = 0; n < len - i -1; ++n) {
      if(Number(list[n + 1].date) < Number(list[n].date)) {
        let temp = list[n]
        list[n] = list[n + 1]
        list[n + 1] = temp
      }
    }
  }

  return list
}