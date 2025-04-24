const config = {
  // 菜单列表
  menuList: [
    {
      title: '页面',
      icon: 'ele-Platform',
      path: '/workspace/screen'
    },
    {
      title: '图元',
      icon: 'ele-StarFilled',
      path: '/workspace/component'
    },
    {
      title: '资源',
      icon: 'ele-Briefcase',
      path: '/workspace/resource'
    },
    {
      title: '模板',
      icon: 'ele-Shop',
      path: '/workspace/market'
    }
  ],
  // 文件服务地址
  filePath: '/frame_api/',
  router: {
    editor: 'editor',
    view: 'view',
    preview: 'preview'
  },
  screenJson:
    '{"canvasConfig":{"width":1920,"height":1080,"background":"#1F2024","backgroundImage":"","renderMode":"standard","defaultScreenId":"","toolbar":{"enabled":true,"visiable":true,"playEnabled":false,"playInterval":3,"defaultBoardId":"xxx001"},"filter":{"enabled":false,"hueRotate":0,"saturate":0,"brightness":0,"contrast":0,"grayscale":0},"viewportTransform":{"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"id":"2uDQXDuz"},"frontend":[{"name":"前景大屏","uid":"xxxfront","type":"frontend","objects":[]}],"screen":[{"name":"页面","uid":"xxx001","type":"screen","objects":[]}],"backend":[{"name":"前景大屏","uid":"xxxbg","type":"backend","objects":[]}],"name":"大屏","lastEditScreenId":"xxx001"}',
  componentJson:
    '{"canvasConfig":{"width":1920,"height":1080,"background":"#1F2024","backgroundImage":"","renderMode":"standard","defaultScreenId":"","toolbar":{"enabled":true,"visiable":true,"playEnabled":false,"playInterval":3,"defaultBoardId":"xxx001"},"filter":{"enabled":false,"hueRotate":0,"saturate":0,"brightness":0,"contrast":0,"grayscale":0},"viewportTransform":{"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"id":"2uDQXDuz"},"frontend":[{"name":"前景大屏","uid":"xxxfront","type":"frontend","objects":[]}],"screen":[{"name":"页面","uid":"xxx001","type":"screen","objects":[]}],"backend":[{"name":"前景大屏","uid":"xxxbg","type":"backend","objects":[]}],"name":"大屏","lastEditScreenId":"xxx001"}',
  typeConfig: {
    screen: {
      title: '图纸',
      category: '100',
      type: 'screen',
      fileType: 'json/*', //文件类型
      filePath: 'datavis/screen', //文件路径
      fileName: 'screen' //文件名
    },
    component: {
      title: '组件',
      category: '200',
      type: '',
      fileType: 'json/*', //文件类型
      filePath: 'datavis/component', //文件路径
      fileName: 'component' //文件名
    },
    image: {
      title: '素材-图片',
      category: '310',
      type: 'image',
      fileType: 'image/*', //文件类型
      filePath: 'datavis/image', //文件路径
      fileName: 'image' //文件名
    },
    video: {
      title: '素材-视频',
      category: '320',
      type: 'video',
      fileType: 'video/*', //文件类型
      filePath: 'datavis/video', //文件路径
      fileName: 'video' //文件名
    },
    map: {
      title: 'map',
      category: '330',
      desc: '地图-geojson',
      fileType: 'json/*', //文件类型
      filePath: 'datavis/geojson', //文件路径
      fileName: 'geojson' //文件名
    },
    market: {
      title: '模板市场-market',
      category: '600',
    }
  }
}
window.datavisConfig = config
