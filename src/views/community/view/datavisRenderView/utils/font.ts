/**
 *注册字体
 * @param {*} value
 */
let fontlist: any = []

export const registerFontlist = (data: any[]) => {
  fontlist = data
}

export const getFontlist = () => {
  return fontlist
}

export const registerFont = (value: any) => {
  const _appendFont = (value: string) => {
    let node = fontlist.find((el: any) => el.value === value)
    // 字体不存在或没有网络源，返回
    if (!node || !node.url) return
    const isFontRegistered = [...document.querySelectorAll('link[rel="stylesheet"]')].some((el: any) => el.href === node.url) // 已经挂载了这个字体，返回
    // 已经挂载了这个字体，返回
    if (isFontRegistered) return
    const createStyle = (node: any) => {
      const style = document.createElement('link')
      style.setAttribute('rel', 'stylesheet')
      style.setAttribute('href', node.url)
      document.head.appendChild(style)
    }
    createStyle(node)
  }
  if (Array.isArray(value)) {
    value.forEach(el => _appendFont(el))
  } else if ((typeof value).toLowerCase() === 'string') {
    _appendFont(value)
  }
}
// ["YouSheBiaoTiHei","PangMenZhengDaoBiaoTiTi"]
export const useFontlist = (fonts: string[]) => {
  if (!fonts || !fonts.length) return
  registerFont(fonts)
}
