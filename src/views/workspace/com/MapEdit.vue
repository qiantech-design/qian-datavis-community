<template>
  <el-dialog class="ui-workspace-dialog" v-model="state.visible" width="800px">
    <template #header>
      <div style="font-size: large">
        {{ state.title }}
      </div>
    </template>
    <div>
      <el-form :model="state.form" :rules="state.rules" label-width="80px" ref="ruleFormRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="state.form.name" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item label="内容">
          <visui-code-editor style="height: 300px" v-if="state.visible" ref="codeEditorRef" :code="state.form.content"
            :config="codeConfig"></visui-code-editor>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer" style="text-align: right">
        <el-button size="small" @click="handleCloseDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit(ruleFormRef)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { useDatavisApi } from '../hooks/useDatavisApi'

const apiHook = useDatavisApi()

const emit = defineEmits(['finish'])

const codeConfig = {
  language: 'json', // 语言 javascript/css/json/html
  automaticLayout: true, // 自动布局
  theme: 'vs-dark', // 主题 vs-dark
  readOnly: false // 是否只读
}

const state = reactive({
  fileService: apiHook.fileService,
  visible: false,
  folder: '',
  title: '',
  form: {
  },
  rules: {
    name: [{ required: true, message: '请输入地图名称' }],
    content: [{ required: true, message: '地图内容不能为空' }]
  }
})

const handleOpenDialog = async ({ title, form, folder }: any) => {
  state.form = form
  state.title = title
  state.form.content = ''
  state.folder = folder
  if (form.id) {
    initGetData()
  }
  state.visible = true
}
// 从接口获取数据,渲染上去
const initGetData = async () => {
  const url = apiHook.fileService + state.form.url
  const [err, res] = await apiHook.getJson(url)
  if (err) return
  state.form.content = JSON.stringify(res)
}

defineExpose({
  handleOpenDialog
})

const handleCloseDialog = () => {
  state.form.content = ''
  state.visible = false
}

const codeEditorRef = ref()
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
  // 先创建
  if (!data.id) {
    const [err, res] = await apiHook.saveResource(data)
    if (err) return
    data.id = res
  }
  const content = codeEditorRef.value.getValue()
  const file = new File([content], `${data.id}.json`, {
    type: 'text/json;charset=utf-8'
  })
  const files = [file]
  const [uploadErr, uploadRes]: any = await apiHook.uploadFiles(files, {
    folder: state.folder,
    isCover: true
  })
  if (uploadErr) return
  data.url = uploadRes.urls[0]
  delete data.content
  handlePost(data)
}


const handlePost = async (params: any) => {
  const [err, res] = await apiHook.saveResource(params)
  if (err) return
  handleCloseDialog()
  emit('finish')
}
</script>