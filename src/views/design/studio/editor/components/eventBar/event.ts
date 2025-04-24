export const defaultEventConfig = {
  request: {
    enable: false
  },
  state: {
    enable: false,
    index: 0
  },
  page: {
    enable: false,
    pageId: '',
    pageIndex: 0
  },
  script: {
    enable: false,
    code: '' // const executeScript = function (value, node) {\n\n}
  },
  write: {
    enable: false
  },
  dialog: {
    enable: false,
    type: ''
  }
}
export const getDefaultEvent = () => {
  return {
    mounted: { enable: false, config: null },
    click: { enable: false, config: null },
    dblclick: { enable: false, config: null },
    mouseenter: { enable: false, config: null },
    mouseleave: { enable: false, config: null }
  }
}
