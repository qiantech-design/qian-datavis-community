<template>
  <div style="padding-top: 14px"></div>
  <visui-item label="页面显示适配">
    <visui-select class="full-width" v-model="config.renderMode" @change="handleChange(['renderMode'], true)">
      <visui-option v-for="item in renderModeOptions" :key="item.value" :label="item.label" :value="item.value"> </visui-option>
    </visui-select>
  </visui-item>
</template>

<script lang="ts" setup>
defineOptions({ name: 'datavisSettingBarDisplay' })

const emit = defineEmits(['change'])

const config = defineModel<any>('config')

const renderModeOptions = [
  {
    label: '按原尺寸溢出滚动',
    value: 'standard'
  },
  {
    label: '铺满屏幕',
    value: 'full'
  },
  {
    label: '按屏幕比例适应',
    value: 'fit'
  }
  // {
  //   label: '横向溢出滚动',
  //   value: 'scrollX'
  // },
  // {
  //   label: '纵向溢出滚动',
  //   value: 'scrollY'
  // }
]

const handleChange = (keys: any, flag: any) => {
  emit('change', {
    keys: keys,
    flag: flag
  })
}
</script>
