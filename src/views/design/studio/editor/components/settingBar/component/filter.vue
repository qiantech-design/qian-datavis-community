<template>
  <visui-collapse-item class="datavis-setting-bar-filter" :title="title" v-model="config.enable" @change="handleChange">
    <visui-item label="">
      <el-button class="refresh-text-btn" type="primary" link @click="handleReset">恢复默认</el-button>
    </visui-item>
    <template v-if="config.enable">
      <visui-item label="色相">
        <visui-slider
          class="hue-rotate"
          :min="-180"
          :max="180"
          :step="1"
          v-model="config.hueRotate"
          show-input
          controls-position="right"
          suffix="%"
          :format-tooltip="formatRate"
          @update:modelValue="handlePreview"
          @change="handleChange"
        />
      </visui-item>
      <visui-item label="饱和度">
        <visui-slider
          class="saturate"
          :min="0"
          :max="200"
          :step="1"
          v-model="config.saturate"
          show-input
          controls-position="right"
          suffix="%"
          :format-tooltip="formatRate"
          @update:modelValue="handlePreview"
          @change="handleChange"
        />
      </visui-item>
      <visui-item label="亮度">
        <visui-slider
          class="brightness"
          :min="0"
          :max="200"
          :step="1"
          v-model="config.brightness"
          show-input
          controls-position="right"
          suffix="%"
          :format-tooltip="formatRate"
          @update:modelValue="handlePreview"
          @change="handleChange"
        />
      </visui-item>
      <visui-item label="对比度">
        <visui-slider
          class="contrast"
          :min="0"
          :max="200"
          :step="1"
          v-model="config.contrast"
          show-input
          controls-position="right"
          suffix="%"
          :format-tooltip="formatRate"
          @update:modelValue="handlePreview"
          @change="handleChange"
        />
      </visui-item>
      <visui-item label="灰度">
        <visui-slider
          class="grayscale"
          :min="0"
          :max="100"
          :step="1"
          v-model="config.grayscale"
          show-input
          controls-position="right"
          suffix="%"
          :format-tooltip="formatRate"
          @update:modelValue="handlePreview"
          @change="handleChange"
        />
      </visui-item>
    </template>
  </visui-collapse-item>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'datavisSettingBarFilter'
})

const config = defineModel<any>('config')
defineProps({
  title: {
    type: String,
    default: '滤镜'
  }
})
const emit = defineEmits(['change', 'input'])

const handleReset = () => {
  const defaultObj = {
    enable: true,
    hueRotate: 0,
    saturate: 100,
    brightness: 0,
    contrast: 0,
    grayscale: 0,
    opacity: 100
  }
  if (JSON.stringify(config.value) !== JSON.stringify(defaultObj)) {
    Object.assign(config.value, defaultObj)
    emit('change')
  }
}

const formatRate = (val: number) => {
  return `${val}%`
}

const handleChange = () => {
  emit('change')
}

const handlePreview = () => {
  emit('input')
}
</script>

<style lang="scss">
.datavis-setting-bar-filter .el-slider .el-slider__bar {
  background: transparent !important;
}
.hue-rotate .el-slider .el-slider__runway {
  background: linear-gradient(270deg, #ff0129 0%, #ff00c4 21%, #0b02ff 41%, rgba(0, 0, 0, 0) 52%, #02ffc7 62%, #fdff00 77%, #ff2203 100%) !important;
}

.saturate .el-slider .el-slider__runway {
  background: linear-gradient(270deg, #fd0402 0%, #6e6e6d 100%) !important;
}

.brightness .el-slider .el-slider__runway {
  background: linear-gradient(270deg, #f8f8f8 0%, #030303 100%) !important;
}

.contrast .el-slider .el-slider__runway {
  background: rgba(255, 255, 255, 0.1) !important;
}

.opacity .el-slider .el-slider__runway {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, #000000 100%) !important;
}

.grayscale .el-slider .el-slider__runway {
  background: rgba(255, 255, 255, 0.1) !important;
}
</style>
