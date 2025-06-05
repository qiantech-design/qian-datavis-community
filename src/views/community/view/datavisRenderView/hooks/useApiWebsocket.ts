// useApiWebsocket.ts
import { ref, onBeforeUnmount } from 'vue'
import { visApi } from '../utils/api'
export function useApiWebsocket(props: { interfaceApi: any, editor: any }) {
  const { interfaceApi, editor } = props;
  // websocket - 完成
  const websocketInstant = ref()
  const interfaceApi1 = {
    websocket: {
      desc: 'websocket接口',
      enable: false,
      url: 'ws://10.10.17.141:9000/wsProxy/monitor',
      paramsFormat: `
    const executeScript = (editor) => {
      const access_token = localStorage.getItem('access_token')
      const devId = localStorage.getItem('devId')
      // return {
      //   access_token: access_token,
      //   deviceId: devId
      // }
      return 'access_token=' + access_token
    }
    `,
      sendScript: `
      const executeScript = (editor, websockInstance)=> {
      const sendData  ={
      "type": "RealDataRich",
      "labels": [
          "BPG_PS02.D1_1.Ia",
          "BPG_PS02.D1_1.Ib",
          "BPG_PS02.D1_1.Ic",
      ]
    }
    websockInstance.send(JSON.stringify(sendData))

    }
      `,
      resFormat: `
    const executeScript = (editor, data)=> {
      return data
    }
    ` //请求处理脚本
    }
  }
  const sendWebsocket = () => {
    if (!interfaceApi || !interfaceApi.websocket || !interfaceApi.websocket.enable) {
      return
    }
    const { url, paramsFormat, resFormat, sendScript } = interfaceApi.websocket
    if (!url) {
      return
    }
    // url地址
    let websocketUrl = url
    // 参数
    let params = ''
    // 处理参数函数
    let paramsFormatFun
    try {
      paramsFormatFun = paramsFormat && visApi.funRunScript(paramsFormat)
    } catch (err) {
      console.error(`websocket-params:${paramsFormatFun}函数错误,${err}`)
    }
    if (typeof paramsFormatFun === 'function') {
      params = paramsFormatFun({ editor })
    }
    if (params) {
      // 拼接参数
      if (typeof params === 'object') {
        /**
         *  {
        //   access_token: access_token,
        //   deviceId: devId
        // }
         */
        const parseParams = new URLSearchParams(params).toString()
        websocketUrl += '?' + parseParams
      } else {
        // 'access_token=' + access_token
        websocketUrl += '?' + params
      }
    }
    const instance = new WebSocket(websocketUrl)
    instance.onopen = () => {
      console.log(`websocket:${websocketUrl}链接成功`)
      if (instance.readyState === instance.OPEN) {
        // 执行脚本操作
        runSendScript()
      } else if (instance.readyState === instance.CONNECTING) {
        // 若是正在开启状态
        console.log('正在开启状态')
      } else {
        // 执行其他操作
        console.log('执行其他操作')
      }
    }

    instance.onmessage = e => {
      // 在这里写处理函数
      const resFormatFunction = resFormat && visApi.funRunScript(resFormat)
      let result = [] as any
      const data = JSON.parse(e.data)
      result = data
      typeof resFormatFunction === 'function' && (result = resFormatFunction({ editor, data }))
      // 设置数据
      editor.fire('websocketRequest', result)
    }
    instance.onclose = () => {
      console.log(`websocket:${websocketUrl}连接已关闭...`)
    }
    const runSendScript = () => {
      // sendScript
      const sendScriptFunction = sendScript && visApi.funRunScript(sendScript)
      typeof sendScriptFunction === 'function' && sendScriptFunction(editor, websocketInstant)
    }

    websocketInstant.value = instance as any
  }

  onBeforeUnmount(() => {
    console.log('清除websocket')
    if (websocketInstant.value) {
      websocketInstant.value.close()
      websocketInstant.value = null
    }
  })
  return {
    sendWebsocket
  }
}
