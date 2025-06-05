<template>
  <visui-collapse-item title="文本设置" v-model:expand="settingExpand" :showSwitch="false">
    <visui-item label="地址">
      <visui-input type="textarea" autoresize v-model="editLink" @change="handleAttrsChange(['data'], node, true)"></visui-input>
    </visui-item>
  </visui-collapse-item>
</template>

<script lang="ts" setup>
//@ts-nocheck
defineOptions({
  name: 'customWidgetIframeProp'
})
import { ref, computed } from 'vue'
import { handleAttrsChange } from '../../datavis'
const props = defineProps({
  node: {
    type: Object,
    default: () => {
      return {
        stateIndex: 0,
        states: []
      }
    }
  }
})

const settingExpand = ref(true)

const editLink = computed({
  get: () => {
    if (props.node.data?.length) {
      return props.node.data[0].link || ''
    } else {
      return ''
    }
  },
  set: (val: string) => {
    props.node.data = [
      {
        link: val
      }
    ]
  }
})
</script>
