<template>
  <div class="preview-wrapper">
    <datavis-render-view ref="datavisRenderRef"></datavis-render-view>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import localforage from 'localforage'
import datavisApi from '@/api/datavisApi'
import datavisRenderView from './datavisRenderView/index.vue'
defineOptions({
  name: 'Datavis-view'
})
const route = useRoute()
const previewStroageKey = 'datavis-preview-data'

const datavisRenderRef = ref()

/**
 * 设置图纸数据
 * @param data 数据
 */
const handleSetDesignData = (data: any) => {
  datavisRenderRef.value.exposeSetDesign(data)
  initGetVariableData()
}
// 本地预览
const initGetLocalData = () => {
  localforage.getItem(previewStroageKey).then((res: any) => {
    const jsonData = JSON.parse(res)
    if (jsonData) {
      handleSetDesignData(jsonData)
    }
  })
}
// 获取图纸数据
const initGetPageData = async () => {
  const data = {
    id: route.params.id
  }
  const [err, res] = await datavisApi.resource.getById(data)
  if (err) return
  const url = datavisApi.fileService + res.url
  const [fileErr, fileRes] = await datavisApi.file.getFile(url)
  if (fileErr) return
  const reader = new FileReader()
  reader.onloadend = e => {
    const pageData: any = e.target?.result
    handleSetDesignData(pageData)
  }
  reader.readAsText(fileRes.data, 'utf-8')
}

const initViewData = () => {
  if (route.params.id) {
    initGetPageData()
  } else {
    initGetLocalData()
  }
}

// 获取变量数据设置到视图组件中
const initGetVariableData = () => {
  // 示例json
  const random = (m, n) => {
    return Math.floor(Math.random() * (m - n)) + n
  }
  setInterval(() => {
    const resData = {
      'data-header-title': {
        data: [
          {
            text: `这是获取的标题`
          }
        ]
      },
      'data-annual-carbon-emission-reduction-effect': {
        data: [
          {
            title: '年碳减排效果 %',
            subTitle: random(80, 95),
            beforeText: '',
            afterText: 'kWh/月'
          }
        ]
      },
      'data-transfer-capacity': {
        data: [
          {
            title: '装机容量  kWp',
            subTitle: 183,
            beforeText: '',
            afterText: 'kWh/月'
          }
        ]
      },
      'data-photovoltaic-stations-title': {
        data: [
          {
            text: `这是光伏站的标题${random(10, 50)}`
          }
        ]
      },
      'data-photovoltaic-stations-real-time-power-generation': {
        data: [
          {
            title: '实时发电功率',
            subTitle: random(500, 1000),
            beforeText: '',
            afterText: 'kW'
          }
        ]
      },
      'data-photovoltaic-stations-peak-power-generation': {
        data: [
          {
            title: '峰值发电功率',
            subTitle: random(500, 1000),
            beforeText: '',
            afterText: 'kW'
          }
        ]
      },
      'data-photovoltaic-stations-grid-connected-voltage': {
        data: [
          {
            title: '井网电压',
            subTitle: 380,
            beforeText: '',
            afterText: 'V'
          }
        ]
      },
      'data-photovoltaic-stations-inverter': {
        data: [
          {
            title: '逆变器',
            subTitle: 3,
            beforeText: '',
            afterText: '个'
          }
        ]
      },
      'data-weather-information-chart': {
        data: [
          {
            product: '08',
            y1: random(10, 50)
          },
          {
            product: '09',
            y1: random(10, 50)
          },
          {
            product: '10',
            y1: random(10, 50)
          },
          {
            product: '11',
            y1: random(10, 50)
          },
          {
            product: '12',
            y1: random(10, 50)
          },
          {
            product: '13',
            y1: random(10, 50)
          },
          {
            product: '14',
            y1: random(10, 50)
          },
          {
            product: '15',
            y1: random(10, 50)
          },
          {
            product: '16',
            y1: random(10, 50)
          },
          {
            product: '17',
            y1: random(10, 50)
          }
        ]
      }
    }
    datavisRenderRef.value.exposeSetData(resData)
  }, 5 * 1000)
}

onMounted(() => {
  initViewData()
})
</script>
<style lang="scss">
.preview-wrapper {
  width: 100%;
  height: 100%;
}
</style>
