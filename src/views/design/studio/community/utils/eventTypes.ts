/**
 * 事件类型
 * 由右侧属性栏、头部工具栏、层级栏、编辑器核心抛出然后转发等产生
 */
export const eventTypes = {
  objectMoving: 'object:moving', // 对象移动，由核心触发
  objectMoveEnd: 'object:move:end', // 对象移动结束，由核心触发
  objectModified: 'object:modified', // 对象属性变化，由核心触发
  objectRotating: 'object:rotating', // 对象旋转，由核心触发
  objectRotateEnd: 'object:rotate:end', // 对象旋转结束，由核心触发
  objectResizing: 'object:resizing', // 对象尺寸改变，由核心触发
  objectResizeEnd: 'object:resize:end', // 对象尺寸改变结束，由核心触发

  selectionUpdated: 'selection:updated', // 选中对象发生变化，由核心触发
  layerChange: 'layer:change', // 层级结构发生变动，由核心触发（组合/解组等）
  editorPanzoom: 'editor:panzoom', // 编辑器缩放、偏移，由核心触发
  editorMouseDown: 'editor:mousedown', // 鼠标落下，由核心触发
  editorMouseUp: 'editor:mouseup', // 鼠标抬起，由核心触发
  historyChanged: 'history:changed', // 撤销重做，由核心触发

  coreOperation: 'core:operation', // 核心操作，由业务触发，请求核心shortcutHandler里的统一方法
  pageOperation: 'page:operation', // 页面操作，请求页面方法(向外抛出，由第三方处理)
  editorStateUpdated: 'editor:state:change', // 编辑器状态改变，由业务触发
  mouseContextmenu: 'mouse:contextmenu', // 编辑器状态改变，由业务触发
  pageSwitch: 'page:switch', // 切换大屏
  dialogOpen: 'dialog:open', // 打开弹窗
  setData: 'object:set:data', // 设置数据

  drawStart: 'draw:start', // 绘制开始
  drawFinish: 'draw:finish', // 绘制结束

  componentsImgFetched: 'components:img:fetched' // 组件图片获取完毕
}

export enum pageOperationTypes {
  objectAdd = 'page:object:add', // 添加组件
  moduleAdd = 'page:module:add', // 添加模块
  themeApiRefresh = 'page:theme:api:refresh', // 主题颜色刷新
  themeApiSave = 'page:theme:api:save', // 主题色新增/保存
  materialUpdate = 'page:material:update', // 素材有增删改
  moduleUpdate = 'page:module:update', // 模块有增删改
  themePreview = 'page:theme:preview', // 全局预览主题色，由业务触发
  themeSet = 'page:theme:set', // 全局设置主题色，由业务触发
  importJSON = 'page:import:json', // 导入json文件
  importDraft = 'page:import:draft', // 导入草稿文件
  importPSD = 'page:import:psd', // 导入psd文件
  saveDraft = 'page:saveDraft', // 保存草稿
  dataPreview = 'page:dataPreview', // 数据预览
  saveAs = 'page:saveAs', // 另存为
  contextmenuChange = 'page:contextmenu:change', // 右键菜单

  downloadJSON = 'page:downloadJSON', // 下载json文件
  downloadImage = 'page:downloadImage', // 下载图片
  deployment = 'page:deployment', // 下载部署包

  publish = 'page:publish', // 发布大屏
  shareLink = 'page:shareLink', // 分享大屏预览链接
  share = 'page:share', // 分享大屏到素材广场
  preview = 'page:preview', // 预览
  save = 'page:save', // 保存

  saveAsModule = 'page:saveAsModule', // 保存为模块
  back = 'page:back', // 返回

  layoutChange = 'page:layout:change', // 编辑器左右显隐改变

  search = 'page:search', // 搜索

  imagePicker = 'page:image:picker', // 打开图片选择器
  fileUpload = 'page:file:upload', // 上传文件

  imageSelectd = 'page:image:selectd', // 选择图片
  signalSelectd = 'page:signal:selectd', // 选择标识
  signalInit = 'page:signal:init', // 标识初始化
  signalUpdated = 'page:signal:updated' // 更新标识
}

/**
 * 编辑器操作类型
 */
export enum operationTypes {
  selectAll = 'selectAll', // 选中所有
  group = 'group', // 组合
  ungroup = 'ungroup', // 解除组合
  arrowLeft = 'arrowLeft', // 左移
  arrowRight = 'arrowRight', // 右移
  arrowUp = 'arrowUp', // 上移
  arrowDown = 'arrowDown', // 下移
  copy = 'copy', // 复制
  paste = 'paste', // 粘贴
  cut = 'cut', // 剪切
  reuse = 'reuse', // 重用
  esc = 'esc', // 退出
  add = 'add', // 添加对象
  delete = 'delete', // 删除选中对象
  bringForward = 'bringForward', // 层级上移
  sendBackwards = 'sendBackwards', // 层级下移
  bringToFront = 'bringToFront', // 层级置顶
  sendToBack = 'sendToBack', // 层级置底
  undo = 'undo', // 撤销
  redo = 'redo', // 恢复
  align = 'align', // 对齐
  alignEqual = 'alignEqual', // 等分对齐
  lock = 'lock', // 锁定
  unlock = 'unlock', // 解锁
  visible = 'visible', // 可见性
  attribute = 'attribute', // 属性修改
  updateLayer = 'updateLayer', // 层级移动
  setZoom = 'setZoom', // 设置缩放
  editorConfig = 'editorConfig', // 编辑器配置修改
  setSelection = 'setSelection' // 设置选中对象
}
