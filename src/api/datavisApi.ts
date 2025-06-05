import axios from 'axios'
import router from '@/router/index'
import { ElMessage } from 'element-plus'
export const apiBase = '/frame_api'
const service = axios.create({
  timeout: 5 * 60 * 1000
})

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function awaitTo<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }

      return [err, undefined]
    })
}

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('DATAVIS_OPEN_TOKEN')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let successFlag = false
    if (response.data.result) {
      const result = +response.data.result
      const message = response.data.message
      switch (result) {
        case 1:
          ElMessage.error(message)
          break
        default:
          successFlag = true
          break
      }
    } else {
      successFlag = true
    }
    if (successFlag) {
      return response
    }
    throw new Error(JSON.stringify(response))
  },
  err => {
    switch (err.response.status) {
      case 401:
      case 403:
        router.push('/login')
        break
      case 500:
        ElMessage.error('服务器又偷懒了，请重试')
        break
      default:
        break
    }
    throw new Error(JSON.stringify(err))
  }
)

export const request = {
  get: async <T = any>(option: any) => {
    const [err, res] = await awaitTo(service({ method: 'GET', ...option }))
    const data = err ? null : res.data.data
    return [err, data as unknown as T]
  },
  post: async <T = any>(option: any) => {
    const [err, res] = await awaitTo(service({ method: 'POST', ...option }))
    const data = err ? null : res.data.data
    return [err, data as unknown as T]
  },
  upload: async <T = any>(option: any) => {
    option.headers = {
      'Content-Type': 'multipart/form-data'
    }
    const [err, res] = await awaitTo(service({ method: 'POST', ...option }))
    const data = err ? null : res.data.data
    return [err, data as unknown as T]
  },
  file: async <T = any>(option: any) => {
    const [err, res] = await awaitTo(service({ method: 'GET', ...option }))
    const data = err ? null : res
    return [err, data as unknown as T]
  },
  json: async <T = any>(option: any) => {
    const [err, res] = await awaitTo(service({ method: 'GET', ...option }))
    const data = err ? null : res.data
    return [err, data as unknown as T]
  },
}
export const datavisApi = {
  fileService: apiBase,
  component: {
    // 获取组件树
    page: async () => {
      const params = {
        nowtime: new Date().getTime()
      }
      return request.get({
        url: `/static/datavis/json/component.json`,
        params
      })
    }
  },
  //获取文件
  // 登录
  account: {
    login: async (data: any) => {
      return request.post({
        url: `${apiBase}/api/account/login`,
        data: data
      })
    }
  },
  folders: {
    list: async (data: any) => {
      return request.get({
        url: `${apiBase}/api/folders/list`,
        params: data
      })
    },
    wholeTree: async (data: any) => {
      return request.get({
        url: `${apiBase}/api/folders/wholeTree`,
        params: data
      })
    },
    save: async (data: any) => {
      return request.post({
        url: `${apiBase}/api/folders/save`,
        data: data
      })
    },
    delete: async (data: any) => {
      return request.post({
        url: `${apiBase}/api/folders/delete`,
        data: data
      })
    }
  },
  resource: {
    list: async (data: any) => {
      return request.get({
        url: `${apiBase}/api/resource/list`,
        params: data
      })
    },
    save: async (data: any) => {
      return request.post({
        url: `${apiBase}/api/resource/save`,
        data: data
      })
    },
    delete: async (data: any) => {
      return request.post({
        url: `${apiBase}/api/resource/delete`,
        data: data
      })
    },
    getById: async (data: any) => {
      return request.get({
        url: `${apiBase}/api/resource/getById`,
        params: data
      })
    },
  },
  // 文件
  file: {
    upload: async (data: any) => {
      return request.upload({
        url: `${apiBase}/api/file/upload`,
        data: data
      })
    },
    getFile: async (url: string) => {
      const data = {
        random: Math.random()
      }
      return request.file({
        url: url,
        data: data,
        responseType: 'blob'
      })
    },
    getJson: async (url: string) => {
      const data = {
        random: Math.random()
      }
      return request.json({
        url: url,
        data: data
      })
    },
    // 批量上传文件
    uploadFiles: async (files: any, options: any) => {
      const { folder, isCover } = options
      const formData = new FormData()
      if (folder) {
        formData.append('folder', folder)
      }
      if (isCover) {
        formData.append('isCover', isCover)
      }

      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
      return await request.upload({
        url: `${apiBase}/api/file/upload`,
        data: formData
      })
    }
  }
}
export default datavisApi
