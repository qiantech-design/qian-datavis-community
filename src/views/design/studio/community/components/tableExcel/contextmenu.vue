<template>
  <ul v-if="visible" class="datavis-editor-table-contextmenu" :style="getPosition" @contextmenu.prevent v-click-outside="close">
    <li class="contextmenu-item" @click="addRow('preview')">向上插入1行</li>
    <li class="contextmenu-item" @click="addRow('next')">向下插入1行</li>
    <li class="contextmenu-item" @click="addCol('preview')">向左插入1列</li>
    <li class="contextmenu-item" @click="addCol('next')">向右插入1列</li>
    <li class="contextmenu-item" @click="delRow">删除该行</li>
    <li class="contextmenu-item" @click="delCol">删除该列</li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
defineOptions({
  name: 'tableContextmenu'
})

const emit = defineEmits(['command'])

const positionTop = ref(0)
const positionLeft = ref(0)
const visible = ref(false)

const getPosition = computed(() => {
  return {
    left: `${positionLeft.value}px`,
    top: `${positionTop.value}px`
  }
})

const addRow = (type: string) => {
  emit('command', 'addRow', type)
  close()
}
const delRow = () => {
  emit('command', 'deleteRow')
  close()
}
const addCol = (type: string) => {
  emit('command', 'addColumn', type)
  close()
}
const delCol = () => {
  emit('command', 'deleteColumn')
  close()
}

const open = (left: number, top: number) => {
  positionLeft.value = left
  positionTop.value = top
  visible.value = true
}
const close = () => {
  visible.value = false
}
defineExpose({
  open,
  close
})
</script>
