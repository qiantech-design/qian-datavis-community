// useAddress.ts
import { onBeforeUnmount } from 'vue'

export function useAddress(props: { address: any; editor: any }) {
  const { address, editor } = props
  const sendAddress = () => {
    //没有配置,直接返回
    if (!address || !address.enable) {
      return
    }

    // 执行数据连接
    if (address.data && address.data.enable) {
      const url = `${address.data.url}?datavisTimestamp=${new Date().getTime()}`
      editor.visApi.axios.get(url).then((res: any) => {
        const resData = res.data.data
        editor.emit('setting:data', resData)
      })
    }
    // 执行脚本
    if (address.script && address.script.enable) {
      const src = `${address.script.url}?datavisTimestamp=${new Date().getTime()}`
      editor.visApi.loadScript({ src: src, cache: false }).then(() => {
        if (window.visExecuteScript) {
          window.visExecuteScript(editor)
        }
      })
    }
  }

  onBeforeUnmount(() => {
    console.log('清除')
  })

  return {
    sendAddress
  }
}
