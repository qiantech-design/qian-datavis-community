<template>
  <div>
    <el-dialog class="ui-workspace-dialog" v-model="state.visible" width="420px" draggable>
      <template #header>
        <div style="font-size: large">
          {{ state.title }}
        </div>
      </template>
      <div>
        <el-form :model="state.form" label-width="80px" ref="ruleFormRef">
          <el-form-item label="配色名称">
            <el-input v-model="state.form.name" placeholder="请输入名称" clearable />
          </el-form-item>
          <el-form-item label="颜色">
            <el-row v-for="(item, index) in state.colorList" :key="index">
              <el-col :span="10">
                <el-color-picker v-model="item.color" />
              </el-col>
            </el-row>
          </el-form-item>

        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer" style="text-align: right">
          <el-button @click="handleClose">取 消</el-button>
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

const emit = defineEmits(['finish'])

const state = reactive({
  visible: false,
  title: '',
  form: {},
  colorList: []
})

const handleOpen = ({ form, title }: any) => {
  state.form = Object.assign({}, form)
  state.colorList = form.colorList
  state.title = title
  state.visible = true
}
const handleClose = () => {
  state.visible = false
}
defineExpose({
  handleOpen,
  handleClose
})

const ruleFormRef = ref<FormInstance>()
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
    ...state.form,
  }
  delete data.colorList
  data.content = JSON.stringify(state.colorList)
  handlePost(data)
}
const handlePost = async (params: any) => {
  const [saveErr] = await apiHook.saveResource(params)
  if (saveErr) return

  handleClose()
  emit('finish')
}
</script>