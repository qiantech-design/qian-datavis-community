importScripts('/static/js/dayjs.min.js')

const dayjsTimeFormating = time => {
  time = time || dayjs()
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
// 如何定义编辑器崩溃
// 1. 超过轮训时间还没有响应回复
// 2. 超过轮询之后才响应
const crashPollingObj = {
  lastActiveTime: '', // 最近一次未崩溃时的轮询时间
  interval: 30 * 1000, // 轮询间隔，如果在下一个轮询周期开始时，上一次轮询没有回应，则认为主线程已崩溃，记录日志
  responseTime: '', //主线程响应worker线程轮询时的时间
  crash: false, // 是否已崩溃
  crashTime: '' // 崩溃时间
}

let token = '' // token
let screenId = ''

let crashPollingTimer

const askCrashPolling = () => {
  crashPollingObj.lastActiveTime = dayjsTimeFormating()
  crashPollingObj.responseTime = ''
  clearTimeout(crashPollingTimer)
  return new Promise(resolve => {
    postMessage({ type: 'crashPolling' })
    crashPollingTimer = setTimeout(() => {
      const { lastActiveTime, responseTime, interval, crash } = crashPollingObj
      if (!crash) {
        if (!responseTime || dayjs(responseTime).diff(dayjs(lastActiveTime)) > interval) {
          crashPollingObj.crash = true
          crashPollingObj.crashTime = dayjsTimeFormating()
          console.log(`未收到主线程响应，时间：${crashPollingObj.crashTime}`)
          const xhr = new XMLHttpRequest()
          xhr.open('POST', '/static/json/data.json')
          xhr.setRequestHeader('Authorization', token)
          xhr.send({ screenId })
        }
      }

      askCrashPolling()
      resolve('')
    }, crashPollingObj.interval)
  })
}
const init = data => {
  token = data.token
  screenId = data.screenId
  askCrashPolling()
}

onmessage = function (event) {
  const { type } = event.data
  switch (type) {
    case 'init':
      init(event.data)
      break
    case 'crashPollingResponse':
      if (crashPollingObj.crash) {
        crashPollingObj.crash = false
        console.log(`崩溃已恢复，时间：${dayjsTimeFormating()},耗时：${dayjs().diff(dayjs(crashPollingObj.crashTime))}ms`)
      }
      crashPollingObj.responseTime = dayjsTimeFormating()
      break
  }
}
