// 默认脚本内容
export const scriptContent = `const executeScript = (editor) => {
  return new Promise((resolve, reject) => {
    // 请求成功
    editor.visApi.axios({
      url: '/resource/json/data.json',
      params: {},
      data: {},
    }).then(res => {
      const data = res.data.Data
      resolve({ setData: data })
    })
  })
}`

// api请求头脚本
export const apiHeaderScriptContent = `const executeScript = (editor) => {
  const token = localStorage.getItem('token')
  return { token }
}`

// api请求参数脚本
export const apiParamsScriptContent = `const executeScript = (editor) => {
  // get方法,返回 params,
  //post 返回 data
  return {
    params: {},
    data: {}
  }
}`

// api请求结果处理脚本
export const apiResScriptContent = `const executeScript = (data) => {
  // data为接口返回的数据，将处理后的数据返回
  if (Array.isArray(data)) {
    return data.map(a => a)
  }
  return { ...data }
}`
export const interfaceApi = {
  script: {
    desc: '全局脚本',
    enable: false,
    format: '',
    isPolling: false,
    timeInterval: 0
  },
  api: {
    desc: 'api接口',
    enable: true,
    method: 'GET',
    url: '',
    headerFormat: '', //脚本
    paramsFormat: '', //参数脚本
    isPolling: false,
    timeInterval: 0,
    resFormat: '' //请求处理脚本
  },
  websocket: {
    desc: 'websocket接口',
    enable: true,
    url: '',
    paramsFormat: '', //参数脚本
    resFormat: '' //请求处理脚本
  }
}

// 静态资源地址配置
export const address = {
  script: {
    enable: false,
    url: '/static/js/script.js'
  },
  data: {
    enable: false,
    url: '/static/data/data.json'
  }
}
