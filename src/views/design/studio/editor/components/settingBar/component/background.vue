<template>
  <visui-item label="背景颜色">
    <visui-select-color
      v-model="config.background"
      @recover="handleRecover(['background'])"
      @input="handleChange(['background'], false)"
      @change="handleChange(['background'], true)"
    />
  </visui-item>
  <visui-item label="背景图片">
    <visui-select-image
      v-model="config.backgroundImage"
      isBackgroud
      @open="handleOpenImg"
      @recover="handleRecover(['backgroundImage'])"
      @input="handleChange(['backgroundImage'], false)"
      @change="handleChange(['backgroundImage'], true)"
    />
  </visui-item>
  <pageFilterBar
    title="背景滤镜"
    v-model:config="config.backgroundFilter"
    @change="handleChange(['backgroundFilter'], true)"
    @input="handleChange(['backgroundFilter'], false)"
  >
  </pageFilterBar>
  <pageFilterBar title="全局滤镜" v-model:config="config.filter" @change="handleChange(['filter'], true)" @input="handleChange(['filter'], false)">
  </pageFilterBar>
</template>

<script lang="ts" setup>
import pageFilterBar from './filter.vue'
import { eventTypes, pageOperationTypes } from '../../../utils'

import useEditor from '../../../hooks/useEditor'
const { editor } = useEditor()

const componentName = 'datavisSettingBarBackground'
defineOptions({ name: componentName })

const emit = defineEmits(['change', 'recover'])

const config = defineModel<any>('config')

const handleChange = (keys: any, flag: any) => {
  emit('change', {
    keys,
    flag
  })
}

const handleRecover = (flag: any) => {
  emit('recover', {
    flag
  })
}

const handleOpenImg = () => {
  editor.fire(eventTypes.pageOperation, {
    type: pageOperationTypes.imagePicker,
    data: {
      callback: ({ url }: any) => {
        handleBackgroundChange(url)
      }
    },
    source: componentName
  })
}
const handleBackgroundChange = (value: string) => {
  config.value.backgroundImage = value
  handleChange(['backgroundImage'], true)
}
</script>
