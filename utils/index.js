export function getDateDiff (dateTimeStamp) {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const halfamonth = day * 15
  const month = day * 30

  const idata = Date.parse(dateTimeStamp.replace(/-/gi, "/"))  //js函数代码：字符串转换为时间
  const now = new Date().getTime()
  const diffValue = now - idata
  if (diffValue < 0) {

    //若日期不符则弹出窗口告之
    //alert("结束日期不能小于开始日期！");
  }
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute
  let result = ''
  if (monthC >= 1) {
    result = parseInt(monthC) + "个月前"
  }
  else if (weekC >= 1) {
    result = parseInt(weekC) + "周前"
  }
  else if (dayC >= 1) {
    result = parseInt(dayC) + "天前"
  }
  else if (hourC >= 1) {
    result = parseInt(hourC) + "小时前"
  }
  else if (minC >= 1) {
    result = parseInt(minC) + "分钟前"
  } else {
    result = "刚刚"
  }
  return result
}

export function debounce (fn, delay) {
  let timerId
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function  _formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
 }
