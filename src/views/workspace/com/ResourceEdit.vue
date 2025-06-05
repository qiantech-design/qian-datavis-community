<template>
  <div>
    <el-dialog class="ui-workspace-dialog" v-model="state.visible" width="360px" draggable>
      <template #header>
        <div style="font-size: large">
          {{ state.title }}
        </div>
      </template>
      <div>
        <el-form :model="state.form" :rules="state.rules" label-width="80px" ref="ruleFormRef">
          <el-form-item label="名称" prop="name">
            <el-input ref="inputRef" v-model="state.form.name" placeholder="名称" clearable />
          </el-form-item>
          <el-form-item label="序号">
            <el-input-number v-model="state.form.sort" class="full-width" placeholder="排序" controls-position="right" clearable />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer" style="text-align: right">
          <el-button @click="handleCloseDialog">取 消</el-button>
          <el-button type="primary" @click="handleSubmit(ruleFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useDatavisApi } from '../hooks/useDatavisApi'

const apiHook = useDatavisApi()

import jsonConfig from './jsonConfig'

const emit = defineEmits(['finish'])

const state = reactive({
  visible: false,
  title: '',
  folder: '',
  form: { id: '', type: 100, sort: 0, name: '', url: '' },
  rules: {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  }
})

const ruleFormRef = ref()
const inputRef = ref()
const handleOpenDialog = ({ title, form, folder }: any) => {
  state.title = title
  state.form = Object.assign({}, form)
  state.visible = true
  state.folder = folder
  setTimeout(() => {
    inputRef.value.select()
    ruleFormRef.value.clearValidate()
  }, 16)
}
const handleCloseDialog = () => {
  state.visible = false
}
defineExpose({
  handleOpenDialog
})

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (valid) {
      handleSave()
    }
  })
}

const handleSave = async () => {
  const data = {
    ...state.form
  }
  if (!state.form.id) {
    const [err, res] = await apiHook.saveResource(data)
    if (err) return
    data.id = res
    const content = jsonConfig[state.form.type]
    const file = new File([content], `${data.id}.json`, {
      type: 'text/json;charset=utf-8'
    })
    const files = [file]
    const [uploadErr, uploadRes]: any = await apiHook.uploadFiles(files, {
      folder: state.folder,
      isCover: true
    })
    if (uploadErr) return
    const { urls } = uploadRes
    data.url = urls[0]
    handlePost(data)
  } else {
    handlePost(data)
  }
}
const handlePost = async (params: any) => {
  const [err, res] = await apiHook.saveResource(params)
  if (err) return
  handleCloseDialog()
  emit('finish')
}
</script>
