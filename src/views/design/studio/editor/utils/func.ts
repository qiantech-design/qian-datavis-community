// 函数转换
export const funEval = (value: string) => {
  // eslint-disable-next-line no-new-func
  return new Function('return ' + value + ';')()
}