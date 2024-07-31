/**
 * 深度拷贝
 * @param obj
 * @returns {Object}
 */
export const deepClone = (obj: any): object => {
  if (obj === null) return null
  const clone = { ...obj }
  Object.keys(clone).forEach(key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]))
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone
}

/**
 * 时间流逝计算
 * @param unixTime 时间戳
 * @returns {string}
 */
export const getDateTimeFormat = (unixTime: number): string => {
  const currTime = new Date().valueOf()
  let time = currTime / 1000 - unixTime / 1000
  if (time >= 0) {
    // 少于一分钟
    if (time < 60) {
      return '刚刚'
    }
    // 秒转分钟
    const minutes = time / 60
    if (minutes < 60) {
      return Math.floor(minutes) + '分钟前'
    }
    // 秒转小时
    const hours = time / 3600
    if (hours < 24) {
      return Math.floor(hours) + '小时前'
    }
    //秒转天数
    const days = time / 3600 / 24
    if (days < 30) {
      return Math.floor(days) + '天前'
    }
    //秒转月
    const months = time / 3600 / 24 / 30
    if (months < 12) {
      return Math.floor(months) + '月前'
    }
    //秒转年
    const years = time / 3600 / 24 / 30 / 12
    return Math.floor(years) + '年前'
  } else {
    time = Math.abs(time)
    // 少于一分钟
    if (time < 60) {
      return '不足一分钟'
    }
    // 秒转分钟
    const minutes = time / 60
    if (minutes < 60) {
      return Math.floor(minutes) + '分钟后'
    }
    // 秒转小时
    const hours = time / 3600
    if (hours < 24) {
      return Math.floor(hours) + '小时后'
    }
    //秒转天数
    const days = time / 3600 / 24
    if (days < 30) {
      return Math.floor(days) + '天后'
    }
    //秒转月
    const months = time / 3600 / 24 / 30
    if (months < 12) {
      return Math.floor(months) + '月后'
    }
    //秒转年
    const years = time / 3600 / 24 / 30 / 12
    return Math.floor(years) + '年后'
  }
}

/**
 * 一维数组转换多维数组
 * @param arr
 * @param num
 * @returns {object[]}
 */
export const format2Array = (arr: string[], num: number): string[][] => {
  const pages = []
  arr.forEach((item, index) => {
    const page = Math.floor(index / num)
    if (!pages[page]) {
      pages[page] = []
    }
    pages[page].push(item)
  })
  return pages
}

/**
 * 判断是否 iOS14
 */
export const isIOS14 = (): boolean => {
  return /^14/.test(Device.systemVersion())
}

/**
 * 获取系统版本号
 * @return number
 */
export const getSystemVersionNumber = (): number => {
  return Number(Device.systemVersion())
}

/**
 * 捐赠支持
 */
export const donationSupport = () => {
  Safari.open('https://qr.alipay.com/fkx16611d9qgth0qzixse66')
}
