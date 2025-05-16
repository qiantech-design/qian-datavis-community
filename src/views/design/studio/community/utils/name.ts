// 大屏本地存储字段
// 复制
export const copyStroageKey = 'datavis-copy-data'
// 草稿
export const draftStroageKey = 'datavis-darft-data'
// 预览图纸数据(预览模式使用，多开编辑器时会互相覆盖，编辑器离开时会自动将编辑器数据写入localforage中)
export const previewStroageKey = 'datavis-preview-data'
// 文件存储文件夹
export const saveFoldKey = 'DataVis'

export const filePrefixKey = 'datavis'

export const designRouter = {
  // 编辑器
  editor: '/studio',
  preview: '/preview',
  // 管理
  index: '/design/index'
}

// 编辑器配置存储字段
export const editorConfigKey = 'datavis-editor-config'