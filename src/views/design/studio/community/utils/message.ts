import { ElMessage } from 'element-plus'

const defaultOption = {
  showClose: true, // 显示关闭按钮
  grouping: true, // 启用分组
  duration: 1500
}
// 自定义消息函数，应用默认参数
export const useMessage: any = (options = {}) => {
  // 调用 ElMessage 时，使用默认参数和传入的参数
  ElMessage({
    ...defaultOption,
    ...options
  })
}
const getFinalOption = (option: any) => {
  let op = typeof option === 'string' ? { message: option } : option
  const finalOption = {
    ...defaultOption,
    ...op
  }
  return finalOption
}

useMessage.success = (option: any) => ElMessage.success(getFinalOption(option))
useMessage.error = (option: any) => ElMessage.error(getFinalOption(option))
useMessage.info = (option: any) => ElMessage.info(getFinalOption(option))
useMessage.warning = (option: any) => ElMessage.warning(getFinalOption(option))
