// 编辑器辅助信息统计相关

import { reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { dayjsTimeFormating } from '../utils/index'
import dayjs from 'dayjs'
import { throttle } from 'lodash-es'
import { useEventListener } from '@vueuse/core'
import axios from 'axios'
export const useHelper = () => {
  const helpState = reactive({
    pageInitTime: dayjsTimeFormating(), // 页面初始化时间
    screenInitTime: '', // 大屏初始化渲染时间，用于大屏渲染耗时记录
    timer: null as any // 定时上传数据定时器
  })

  // 编辑器统计数据
  const reportingData = {
    lastEffectiveOperationTime: '', // 最近一次有效操作编辑器的时间
    lastEffectiveDurationTime: '', // 最近一次有效使用编辑器时间
    effectiveOperationCount: 0, // 最近五分钟有效操作数
    effectiveOperationDuration: 0 // 最近五分钟在线时长
  }
  /**
   * 上传统计数据(每隔五分钟)
   */
  const uploadReporting = () => {
    return new Promise((resolve: any) => {
      if (reportingData.effectiveOperationCount > 0 || reportingData.effectiveOperationDuration) {
        console.log(reportingData)
        axios.get('/resource/json/data.json', { params: reportingData }).then(() => {
          reportingData.effectiveOperationCount = 0
          reportingData.effectiveOperationDuration = 0
          resolve('ok')
        })
      } else {
        resolve('ok')
      }
    })
  }

  const logPerformance = (type: any, time: number) => {
    console.log(`hook-${type}耗时：${time}ms`)
  }
  const logError = (event: Event) => {
    console.log(event)
  }
  /**
   * 处理未捕捉的错误
   * @param e 事件
   */
  const handleError = (e: any) => {
    logError(e)
    // e.preventDefault()
  }
  const handleBeforeunload = () => {
    uploadReporting()
  }

  // 监听页面关闭事件
  const beforeunload = () => {
    useEventListener('beforeunload', handleBeforeunload)
  }
  // 编辑器初始化
  const editInitTime = () => {
    const diffTime = dayjs().diff(dayjs(helpState.pageInitTime))
    helpState.pageInitTime = dayjs().valueOf()
    logPerformance('编辑器初始化', diffTime)
  }
  // 编辑器初始化
  const screenInitStart = () => {
    helpState.screenInitTime = dayjsTimeFormating()
  }
  const screenInitEnd = () => {
    const diffTime = dayjs().diff(dayjs(helpState.screenInitTime))
    logPerformance('大屏渲染', diffTime)
  }
  let worker: any
  const initWorker = () => {
    worker = new Worker('/resource/js/worker.js')
    worker.onmessage = (e: any) => {
      const { type } = e.data
      switch (type) {
        case 'crashPolling':
          worker.postMessage({ type: 'crashPollingResponse' })
          break
      }
    }
    worker.postMessage({ type: 'init', token: '123456', scrrenId: 'abcdefg' })
  }

  /**
   * 每隔五分钟上传一次有效使用编辑器、编辑器使用时长的结算
   */
  const timingReporting = () => {
    helpState.timer = setTimeout(() => {
      uploadReporting().then(() => {
        timingReporting()
      })
    }, 5 * 60 * 1000)
  }

  const simulationCrash = () => {
    // // 1. 栈溢出
    // function crash() {
    //   crash()
    // }
    // crash()
    // // 2. 模拟计算密集导致主线程阻塞
    // let time = dayjs()
    // while (true) {
    //   if (dayjs().diff(time, 'second') > 16) {
    //     break
    //   }
    // }
    // // 3. 内存爆满
    // let memoryLeak = []
    // let i = 0
    // while (true) {
    //   i++
    //   if (i % 2 === 0) {
    //     memoryLeak.push(new Array(1000000).fill('leak'))
    //   }
    // }
  }

  /**
   * 检查用户的有效操作，通过鼠标移动和键盘事件
   * 有效使用时间以30秒为单位，如果在30秒内有有效操作，该时间段累计30秒
   */
  const handleCheckEffectiveOperation = throttle(() => {
    let effectiveOperation = false // 有效操作标志
    let effectiveDuration = false // 有效使用时间标志
    if (!reportingData.lastEffectiveOperationTime) {
      reportingData.lastEffectiveOperationTime = dayjsTimeFormating()
      effectiveOperation = true
    } else {
      if (!dayjs().isSame(dayjs(reportingData.lastEffectiveOperationTime), 'minute')) {
        reportingData.lastEffectiveOperationTime = dayjsTimeFormating()
        effectiveOperation = true
      }
    }
    if (!reportingData.lastEffectiveDurationTime) {
      reportingData.lastEffectiveDurationTime = dayjsTimeFormating()
      effectiveDuration = true
    } else {
      const lastValueSecond = dayjs(reportingData.lastEffectiveDurationTime).get('second') <= 30
      const nowValueSecond = dayjs().get('second') <= 30
      if (lastValueSecond !== nowValueSecond) {
        effectiveDuration = true
      }
    }
    if (effectiveOperation) {
      reportingData.effectiveOperationCount++
    }
    if (effectiveDuration) {
      reportingData.effectiveOperationDuration += 30
    }
  }, 500)

  const initHelper = () => {
    initWorker()
    timingReporting()
    useEventListener('mousemove', handleCheckEffectiveOperation)
    useEventListener('keyup', handleCheckEffectiveOperation)
    useEventListener('error', handleError)
  }
  const clearHelper = () => {
    worker && worker.terminate()
    helpState.timer && clearTimeout(helpState.timer)
    helpState.timer = null
  }

  return {
    beforeunload,
    editInitTime,
    screenInitStart,
    screenInitEnd,
    initHelper,
    clearHelper,
    simulationCrash
  }
}
