// 导出分类列表
/**
 * @param {Array} list 分类列表
 */
const list = [
  {
    name: 'custom-001',
    title: '自定义',
    children: [
      {
        name: 'custom-sub-001',
        title: '常用',
        children: [
          {
            name: 'customWidgetButton',
            url: '/resource/component/interactive/visWidgetButton.png',
            title: '按钮',
            isAuth: true
          },
          {
            name: 'customWidgetIframe',
            url: '/resource/component/interactive/iframe.png',
            title: 'Iframe组件',
            isAuth: true
          }
        ]
      },
      {
        name: 'custom-sub-002',
        title: '装饰',
        children: [
          {
            name: 'customWidgetImage',
            url: '"/resource/componentConfig/source1.jpeg',
            title: '图片',
            isAuth: true
          }
        ]
      }
    ]
  }
]
export default list
