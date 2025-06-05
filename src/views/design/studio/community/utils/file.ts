/**
 * 将树形数据转为一维数组(父子对象保持着引用关系)
 * @param {要转化的树形数据} treeData
 * @param {子级数据在父级对象中的属性名} childField
 * @returns
 */
import { fileService } from '@/api'

export const treeToList = (treeData: any, childField: any) => {
  let queen: any = []
  const out: any = []
  if (!treeData || treeData.length === 0) {
    return out
  }
  queen = queen.concat(treeData)
  while (queen.length) {
    const first = queen.shift()
    if (first[childField]) {
      queen = queen.concat(first[childField])
    }
    out.push(first)
  }
  return out
}

/**
 * 获取树的路径
 * @param {*} value 值
 * @param {*} key 键
 * @param {*} treeData 树数据
 * @param {*} childField 子级数据字段
 * @returns
 */
export const getPathByKey = (value: any, key: any, treeData: any, childField = 'Folders') => {
  const getNodePath = (node: any, key: any, value: any, paths: any) => {
    paths.push(node)
    // 找到符合条件的节点，通过throw终止掉递归
    if (node[key] === value) {
      // 也可以直接使用return;结束循环
      throw new Error('over!')
    }
    const children = node[childField] || []
    if (children.length) {
      for (var i = 0; i < children.length; i++) {
        getNodePath(children[i], key, value, paths)
      }
      // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
      paths.pop()
    } else {
      // 找到叶子节点时，删除路径当中的该叶子节点
      paths.pop()
    }
  }

  // 用于存储节点唯一标识值路径数组
  const paths: any = []

  try {
    for (let i = 0; i < treeData.length; i++) {
      getNodePath(treeData[i], key, value, paths)
    }
  } catch (e) {
    return paths
  }
}
/**
 * 获取文件的base64字符串（svg文件、jpg/jpeg/png）
 * @param {File} file
 * @returns
 */
export const getFileBase64String = (file: any) => {
  const fileReader = new FileReader()
  return new Promise(resolve => {
    fileReader.onloadend = function (e) {
      const fileType = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      const result = e.target?.result || ''
      if (fileType === 'svg') {
        const image = new Image() as any
        image.src = result
        image.onload = () => {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          const { width, height } = image
          canvas.width = width
          canvas.height = height
          if (context) {
            context.drawImage(image, 0, 0, width, height)
          }
          const data = canvas.toDataURL('jpeg')
          resolve(data)
        }
      } else {
        resolve(result)
      }
    }
    fileReader.readAsDataURL(file)
  })
}

export const clearStorage = () => {
  window.localStorage.clear()
  window.sessionStorage.clear()
}

// 下载文件
export const downloadFile = (url: string, filename: string, fileSuffix: string) => {
  const ele = document.createElement('a') // 创建下载链接
  ele.download = `${filename}.${fileSuffix}` // 设置下载的名称
  ele.style.display = 'none' // 隐藏的可下载链接
  // 字符内容转变成blob地址
  ele.href = url
  // 绑定点击时间
  document.body.appendChild(ele)
  ele.click()
  // 然后移除
  document.body.removeChild(ele)
}

/**
 * 获取处理过后的文件url。如果是服务器文件，拼接上文件服务器的地址。如果是静态文件无须处理
 * @param url
 * @returns
 */
export const getHandledFileUrl = (url: string) => {
  url = url || ''
  return url
}

/**
 * 从url中解析出文件路径、文件名、文件类型
 * @param url 路径
 * @returns
 */
export const analysisFileUrl = (url: string) => {
  url = url || ''
  const splitArr = url.split('/')
  const fileFullName = splitArr[splitArr.length - 1]
  const arr = fileFullName.split('.')
  return {
    path: splitArr.slice(0, splitArr.length - 1).join('/'),
    fileFullName,
    fileName: arr.slice(0, arr.length - 1).join('.'),
    fileType: arr[arr.length - 1]
  }
}

/**
 * 根据图片url获取图片的宽高
 * @param url
 * @returns
 */
export const getImageSize = (url: string) => {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.onload = function () {
      const { width, height } = img
      resolve({ width, height })
    }
    img.onerror = function (err) {
      reject(err)
    }
    img.src = url
  })
}

/**
 * 将base64格式的字符串转换为File对象
 * @param base64Data 字符串
 * @param filename 文件名（无需写后缀）
 * @returns
 */
export const base64ToFile = (base64Data: string, filename: string) => {
  // 将base64的数据部分提取出来
  const parts = base64Data.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const suffix = contentType.split('/')[1] // 文件后缀
  const raw = window.atob(parts[1])

  // 将原始数据转换为Uint8Array
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  // 使用Blob和提取出的数据内容创建一个新的Blob对象
  const blob = new Blob([uInt8Array], { type: contentType })
  const file = new File([blob], filename + '.' + suffix, { type: contentType })
  // 返回File对象
  return file
}

const templateKindMap: any = {
  1: 'screen',
  2: 'map',
  3: 'component',
  4: 'material',
  5: 'portal'
}

const templateAttrMap: any = {
  1: 'personal',
  0: 'system'
}

/**
 * 获取类型对应的上传路径
 * @param templateKind 类型 1：大屏 2：地图 3：组件库 4：素材库 5：门户
 * @param templateAttr 属性 0:系统，1：个人
 * @returns
 */
export const getUploadPath = ({ templateKind = 1, templateAttr = 1 }) => {
  return `${templateAttrMap[templateAttr]}/${templateKindMap[templateKind]}`
}
