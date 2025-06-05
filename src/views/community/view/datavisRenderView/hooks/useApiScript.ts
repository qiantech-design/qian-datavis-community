// useApiScript.ts
import { ref, onBeforeUnmount } from 'vue'
import { visApi } from '../utils/api'

export function useApiScript(props: { interfaceApi: any, editor: any }) {
  const { interfaceApi, editor } = props;
  const scriptSetInterval = ref()
  const interfaceApi1 = {
    script: {
      enable: true,
      format: `
    const executeScript = (editor)=> {
    console.log(API)
      return new Promise((resolve, reject) => {
        // 请求成功
        const token = localStorage.getItem('token')
        editor.visApi.axios({
          method: 'get',
          url: '/static/json/data.json',
          headers: {
            token: token
          },
          params: {
            dev: '888'
          },
          data: {},
        }).then(res => {
          const data = res.data
          resolve({setData: data})
        })
      })
    }`,
      isPolling: false,
      timeInterval: 2
    }
  }
  const sendScript = () => {
    if (!interfaceApi || !interfaceApi.script || !interfaceApi.script.enable) {
      return
    }
    const { format, isPolling, timeInterval } = interfaceApi.script
    const formatFunction = format && visApi.funRunScript(format)
    let scriptInstance = async () => {
      if (typeof formatFunction === 'function') {
        let result = await formatFunction({ editor })
        if (result.setData) {
          editor.fire('scriptRequest', result.setData)
        }
      }
    }
    scriptInstance()
    // 设置数据
    if (isPolling) {
      clearInterval(scriptSetInterval.value)
      scriptSetInterval.value = setInterval(scriptInstance, (+timeInterval || 1) * 1000)
    }
  }
  onBeforeUnmount(() => {
    if (scriptSetInterval.value) {
      clearInterval(scriptSetInterval.value)
    }
  })
  return {
    sendScript
  }
}
