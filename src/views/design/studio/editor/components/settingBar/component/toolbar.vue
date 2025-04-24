<template>
  <visui-collapse-item title="工具栏" v-model="config.enable" @change="handleChange(['toolbar'], true)">
    <visui-item label="工具栏">
      <visui-checkbox v-model="config.visiable" label="显示" @change="handleChange(['toolbar'], true)"></visui-checkbox>
    </visui-item>
    <visui-item label="大屏轮播">
      <visui-checkbox v-model="config.playEnable" @change="handleChange(['toolbar'], true)"></visui-checkbox>
    </visui-item>
    <visui-item label="页面停留时间" v-if="config.playEnable">
      <visui-input-number v-model="config.playInterval" suffix="s" placeholder="请输入停留时间" @change="handleChange(['toolbar'], true)">
      </visui-input-number>
    </visui-item>
  </visui-collapse-item>
</template>

<script lang="ts" setup>
defineOptions({ name: 'datavisSettingBarToolbar' })

const emit = defineEmits(['change'])

const config = defineModel<any>('config')

const handleChange = (keys: any, flag: any) => {
  emit('change', {
    keys,
    flag
  })
}
</script>
