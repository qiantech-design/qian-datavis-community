// useApiRequest.ts
import { ref, onBeforeUnmount } from 'vue'
import { visApi } from '../utils/api'

export function useApiRequest(props: { interfaceApi: any, editor: any }) {
  const { interfaceApi, editor } = props;
  const apiSetInterval = ref<any>(null)
  let interfaceApi1 = {
    api: {
      method: 'get',
      url: '/com_api/base/sys/dict/findDictDetailListByCode',
      // url: '/ems_api/api/Menu/RoleMenu',
      // url: '/book_api',
      desc: 'api接口',
      enable: false,
      headerFormat: `
      const executeScript = (editor)=> {
        // const token = localStorage.getItem('access_token')
        return {
          Authorization: 'Bearer 8885ee5e-b0e2-4b42-9dc8-202a73e3fb55'
        }
      }
    `, //脚本
      paramsFormat: `
        const executeScript = (editor)=> {
          // get方法,返回 params,
          //post 返回 data
          return {
          params: {
            code: '1002'
          }
            // // params: {
            // //   keyword: '出版社'
            // // },
            // data: {}
          }
        }
      `, //参数脚本
      isPolling: true,
      timeInterval: 2.5,
      resFormat: '' //请求处理脚本
    }
  }
  const sendRequest = () => {
    //调试示例

    if (!interfaceApi || !interfaceApi.api || !interfaceApi.api.enable) {
      return
    }
    const { url, method, headerFormat, paramsFormat, resFormat, isPolling, timeInterval } = interfaceApi.api
    if (!url) {
      return
    }

    const headerFormatFunction = headerFormat && visApi.funRunScript(headerFormat)
    const headers = typeof headerFormatFunction === 'function' && headerFormatFunction({ editor })
    const paramsFormatFunction = paramsFormat && visApi.funRunScript(paramsFormat)
    const paramsOptions = typeof paramsFormatFunction === 'function' && paramsFormatFunction({ editor })
    const requsetInstance = () => {
      visApi
        .axios({
          method: method,
          url: url,
          headers: headers || {},
          ...paramsOptions
        })
        .then(res => {
          const resFormatFunction = resFormat && visApi.funRunScript(resFormat)
          let result = []
          if (typeof resFormatFunction === 'function') {
            result = resFormatFunction(res.data)
          } else {
            result = res.data
          }
          editor.fire('apiRequest', result)
        })
    }
    requsetInstance()
    // 循环没有生效
    if (isPolling) {
      clearInterval(apiSetInterval.value)
      apiSetInterval.value = setInterval(requsetInstance, (+timeInterval || 1) * 1000)
    }
  }

  onBeforeUnmount(() => {
    console.log('清除')
    if (apiSetInterval.value) {
      clearInterval(apiSetInterval.value)
    }
  })

  return {
    sendRequest
  }
}
