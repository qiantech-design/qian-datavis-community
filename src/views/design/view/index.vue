<template>
  <div class="preview-wrapper">
    <datavis-render-view ref="datavisRenderRef" @event="handleRenderCommand"></datavis-render-view>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import localforage from 'localforage'
import { draftStroageKey } from '../studio/community/utils/name'
import datavisApi from '@/api/datavisApi'
import datavisRenderView from '../../community/view/datavisRenderView/index.vue'

defineOptions({
  name: 'DatavisView'
})
const route = useRoute()

const datavisRenderRef = ref()

/**
 * 设置图纸数据
 * @param data 数据
 */
const handleSetDesignData = (data: any) => {
  datavisRenderRef.value.exposeSetDesign(data)
}
// 本地预览
const initGetLocalData = () => {
  localforage.getItem(draftStroageKey).then((res: any) => {
    const jsonData = JSON.parse(res)
    if (jsonData) {
      const data = jsonData[route.query.id as any]
      if (data) {
        handleSetDesignData(data.pageData)
      }
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
  } else if (route.query.id) {
    initGetLocalData()
  }
}

const handleRenderCommand = (e: any) => {
  console.log('handleRenderCommand', e)
}
onMounted(() => {
  // 可以调用获取数据接口
  initViewData()
})
</script>
<style lang="scss">
.preview-wrapper {
  width: 100%;
  height: 100%;
}
</style>
