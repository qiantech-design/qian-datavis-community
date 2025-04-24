import { inject } from 'vue'
import { eventTypes, operationTypes } from '../utils'
import { cloneDeep, mergeWith } from 'lodash-es'

/**
 * 获取getActiveSelection
 * @param editor
 */
const getActiveSelection = (editor: any) => {
  const activeObj = editor.getActiveObject()
  const activeSelection = activeObj && activeObj.type === 'activeSelection' ? activeObj.getPosition() : null
  return activeSelection
}

/**
 * 获取合并后的数据
 * @param target 目标数据
 * @param source 源数据
 */
const getMergeData = (target: any, source: any): any => {
  return mergeWith(target, source, (objValue: any, srcValue: any) => {
    if (Array.isArray(objValue)) {
      // 如果要合并的对象时数组，先将目标数组的长度截断为源数组的长度再进行合并
      const arr = objValue.slice(0, srcValue.length)
      return getMergeData(arr, srcValue)
    }
    if (typeof objValue === 'object') {
      return getMergeData(objValue, srcValue)
    } else {
      if (srcValue !== null) {
        return srcValue
      }
      return objValue
    }
  })
}

/**
 * 获取对象中指定key的属性
 * @param obj 对象
 * @param keys 属性key列表
 * @returns
 */
const getObjDataByKeys = (obj: any, keys: string[]) => {
  const data: any = {}
  keys.forEach((key: string) => {
    data[key] = cloneDeep(obj[key])
  })
  return data
}
export default function useEditor() {
  const datavisEditor = inject('datavisEditor') as any
  const screenList = inject('screenList') as any
  const editor = datavisEditor.value

  // 提供对象属性撤销重做功能。注意：选中的对象必须为同一类！！！
  const writeBackAttrs = (keyList: string[], node: any, isSaveAction = false) => {
    keyList = keyList.concat(['id']) // 自动加上id
    const idList = editor.__tempIdList || [] // 记录了所有被引用属性的id列表
    let objs = editor.getObjectsByCondition((a: any) => idList.includes(a.id))
    if (!objs.length) {
      objs = editor.getActiveObjects()
      editor.__tempIdList = objs.map((a: any) => a.id)
    }
    if (objs.length === 0) {
      console.log('没有找到对象')
      return
    }
    const toData: any = []
    const fromData: any = []
    const sourceData = getObjDataByKeys(node, keyList)
    const activeSelection = getActiveSelection(editor)
    objs.forEach((item: any) => {
      keyList.forEach((key: string) => {
        // 判断对象上是否有__key，该key保存变动之前的原始值，如果没有则设置，否则不处理
        const fieldData = Reflect.get(item, `__${key}`)
        if (!fieldData) {
          const orginFielddata = Reflect.get(item, key)
          Reflect.set(item, `__${key}`, cloneDeep(orginFielddata))
        }
      })
      const parent = item.group || editor
      const index = parent.objects.findIndex((a: any) => a.id === item.id)
      const parentId = item.group ? item.group.id : null
      const targetData = getObjDataByKeys(item, keyList) // 获取当前对象的属性
      const mergeData = getMergeData(targetData, sourceData) // 合并数据
      const toAttr = { index, parentId, data: mergeData }
      toData.push(toAttr)
      if (isSaveAction) {
        const obj = { id: item.id }
        keyList.forEach((key: string) => {
          const data = Reflect.get(item, `__${key}`)
          Reflect.set(obj, key, data)
          delete item[`__${key}`]
        })
        fromData.push({ index, parentId, data: obj })
      }
    })
    const param = {
      to: {
        activeSelection,
        data: toData
      }
    }
    if (isSaveAction) {
      Reflect.set(param, 'from', {
        activeSelection,
        data: fromData
      })
      delete editor.__tempIdList
    }
    editor.fire(eventTypes.coreOperation, { action: operationTypes.attribute, param })
  }
  return {
    editor,
    writeBackAttrs,
    screenList
  }
}
