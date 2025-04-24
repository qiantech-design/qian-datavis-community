// eslint-disable-next-line no-new-func
/**
 *
 * @param value string
 * @returns Function
 * 举例
 const script = `const executeScript = function(value, item){
  return true
}`

const scriptFormatter = funRunScript(script)
scriptFormatter(value, item)

 */

export const funRunScript = (value: any) => {
  return new Function(value + '; return executeScript')()
}

/**
 * 判断是否有值
 * @param obj
 * @returns
 */
export const isNoEmpty = (obj: any) => {
  if (typeof obj === 'undefined' || obj === null || obj.toString().trim() === '') {
    return false
  }
  return true
}

/**
 * 将字符串转为对象或函数
 * @param value
 * @returns
 */
export const funEval = (value: any) => {
  return new Function('return ' + value + ';')()
}
