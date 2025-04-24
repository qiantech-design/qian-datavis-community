<template>
  <el-dialog modal-append-to-body title="提示" v-model="state.visible" top="33vh" width="30%" :close-on-click-modal="false">
    <span>当前返回将不会保存任何操作，是否保存？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="warning" @click="handleNoSave">不保存</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
defineOptions({
  name: 'backDialog'
})
const emit = defineEmits(['finish'])

// 模板和模块特殊处理
const state = reactive({
  visible: false,
  action: '',
  name: '',
  title: '',
  cover: false
})

const handleOpenDialog = () => {
  state.visible = true
}
const handleCloseDialog = () => {
  state.visible = false
}

defineExpose({
  handleOpenDialog,
  handleCloseDialog
})

const handleNoSave = () => {
  emit('finish', '')
  handleCloseDialog()
}
const handleSave = () => {
  emit('finish', 'save')
  handleCloseDialog()
}
</script>
