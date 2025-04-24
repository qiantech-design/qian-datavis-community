/**
 * 全局函数
 *  */
import axios from 'axios'
import { funRunScript } from './func'
import { get } from 'lodash-es'

/**
 * 加载css
 * @param {*} src
 * @returns
 * loadCSS('/static/css/demo.css')
 */
const loadCSS = (src: string) => {
  return new Promise((resolve, reject) => {
    const existingLink = document.querySelector(`link[href='${src}']`)
    if (existingLink) {
      resolve('') // 如果链接已存在，直接返回已解决的 Promise
      return
    }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = src
    link.onload = () => {
      resolve('') // 加载成功，调用 resolve
    }
    link.onerror = () => {
      // 加载失败，调用 reject
      reject(new Error(`Failed to load CSS: ${src}`))
    }
    document.head.appendChild(link)
  })
}

/**
 * 加载js
 * @param {*} src
 * @returns
 * loadScript({'/static/js/demo.js'})
 */
const loadScript = ({ src = '', cache = true }, callback: any) => {
  return new Promise((resolve, reject) => {
    // 检查是否存在相同src的script标签
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (cache) {
      if (existingScript) {
        // 如果存在，可能需要检查它是否已加载，或者直接调用回调
        if (existingScript.getAttribute('data-loaded') === 'true') {
          resolve('')
        } else {
          // 如果脚本正在加载中，等待它完成
          existingScript.addEventListener('load', callback)
        }
        return
      }
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src

    // 将回调函数封装在自执行函数中，确保callback只执行一次
    script.addEventListener('load', () => {
      script.setAttribute('data-loaded', 'true')
      resolve('')
    })

    // 错误处理，确保在加载失败时移除脚本并执行错误处理回调
    script.addEventListener('error', () => {
      document.head.removeChild(script)
      reject(new Error('Script load error'))
    })

    document.head.appendChild(script)
  })
}

export const visApi = {
  axios: axios,
  funRunScript: funRunScript,
  loadCSS: loadCSS,
  loadScript: loadScript,
  // 根据id获取值
  getValueById({ id, editor }: any) {
    const findItem = editor.getObjectById(id) || {}
    return findItem.data
  },
  // 根据id获取到组件
  getWidgetById({ id, editor }: any) {
    const findItem = editor.getObjectById(id)
    return findItem
  },
  // 根据定义的标识获取组件-完成
  getWidgetBySignal({ signal, editor }: any) {
    const objects = editor.getObjectsByCondition((item: any) => item.signal == signal)
    return objects[0]
  },
  // 根据id 写值
  writeValueById({ id, data, editor }: any) {
    const findItem = visApi.getWidgetById({ id, editor })
    if (findItem) {
      findItem.emit('setData', data)
    }
  },
  // 根据控件名称写值-完成
  writeValueByName({ name, data, editor }: any) {
    const traverse = (arr: any[], callback: any) => {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        callback(item)
        if (item.objects && item.objects.length) {
          traverse(item.objects, callback)
        }
      }
    }
    traverse(editor.objects, (item: any) => {
      if (item.component.name == name) {
        item.emit('setData', data)
      }
    })
  },
  /**
   * 根据标识符写值
   * @param param0 {data: Object, signal: String } 控件标识和数据
   * data 格式为 {'data-header-title': {data: [{text: '标题'}]}}
   * @returns
   */
  writeValueBySignal({ data, editor }: any) {
    if (!data) return
    if (Object.keys(data).length) {
      Object.keys(data).forEach(key => {
        const objs = editor.getObjectsByCondition((item: any) => item.signal == key)
        objs.forEach((item: any) => {
          const itemData = get(data, item.signal)
          if (itemData) {
            item.emit('setData', itemData.data)
          }
        })
      })
    }
  }
}
