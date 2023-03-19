// 便利関数置き場

export const getDateStringYMD = (date: string) => {
  // date : YYYYMMDD
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)
  return `${year}-${month}-${day}`
}

export const getDateStringYMDHMS = (date: string) => {
  // date : YYYYMMDDHHMMSS
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)
  const hour = date.slice(8, 10)
  const minutes = date.slice(10, 12)
  const seconds = date.slice(12, 14)
  return `${year}-${month}-${day}-${hour}-${minutes}-${seconds}`
}

export const createRandomString = (idLen: number) => {
  const strList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from(crypto.getRandomValues(new Uint32Array(idLen))).map((num) => (
    strList[num % strList.length]
  )).join('')
}

export const whatTimeIsItNow = () => {
  const timeData = new Date()
  const year = timeData.getFullYear()
  const month = ('0' + `${timeData.getMonth() + 1}`).slice(-2)
  const date = ('0' + timeData.getDate()).slice(-2)
  const hours = ('0' + timeData.getHours()).slice(-2)
  const minutes = ('0' + timeData.getMinutes()).slice(-2)
  const seconds = ('0' + timeData.getSeconds()).slice(-2)

  // YYYYMMDDHHMMSS
  return `${year}${month}${date}${hours}${minutes}${seconds}`
}