<template>
  <visui-item label="默认子屏">
    <visui-select class="full-width" v-model="config.defaultScreenId" @change="handleChange(['defaultScreenId'], true)">
      <visui-option v-for="item in screenList" :key="item.uid" :label="item.name" :value="item.uid"> </visui-option>
    </visui-select>
  </visui-item>
</template>

<script lang="ts" setup>
import useEditor from '../../../../editor/hooks/useEditor'
defineOptions({ name: 'datavisSettingBarSubpage' })
const { screenList } = useEditor()

const emit = defineEmits(['change'])

const config = defineModel<any>('config')

const handleChange = (keys: any, flag: any) => {
  emit('change', {
    keys,
    flag
  })
}
</script>
