<template>
  <visui-item label="屏幕大小">
    <div class="design-flex column">
      <el-select v-model="pageSize" placeholder="请选择屏幕尺寸" @change="handleChangeSize">
        <el-option v-for="item in pageSizeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <div class="design-flex row mt-8">
        <visui-input-number suffix="W" v-model="config.width" @change="handleChange(['width'], true)"></visui-input-number>
        <visui-input-number class="ml-8" suffix="H" v-model="config.height" @change="handleChange(['height'], true)"></visui-input-number>
      </div>
    </div>
  </visui-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
defineOptions({ name: 'datavisSettingBarSize' })
const emit = defineEmits(['change'])

const config = defineModel<any>('config')

const pageSizeOptions = [
  {
    label: '大屏推荐尺寸1920*1080',
    value: '1920*1080'
  },
  {
    label: 'web推荐尺寸1366*768',
    value: '1366*768'
  },
  {
    label: 'web最小尺寸1024*768',
    value: '1024*768'
  },
  {
    label: '自定义',
    value: 'x*x'
  }
]
const pageSize = ref('')

const handleChange = (keys: any, flag: any) => {
  emit('change', {
    keys,
    flag
  })
}
// 初始化 pageSize
const init = () => {
  const pageConfig = config.value
  const sizeStr = `${pageConfig.width}*${pageConfig.height}`
  const findObj = pageSizeOptions.find(v => v.value === sizeStr)
  if (findObj) {
    pageSize.value = findObj.value
  } else {
    pageSize.value = 'x*x'
  }
}

const handleChangeSize = (val: string) => {
  let [width, height]: any[] = val.split('*')
  if (width === 'x' && height === 'x') {
    return
  } else {
    width = parseInt(width)
    height = parseInt(height)
    config.value.width = width
    config.value.height = height
    handleChange(['width', 'height'], true)
  }
}

defineExpose({
  init
})
</script>
