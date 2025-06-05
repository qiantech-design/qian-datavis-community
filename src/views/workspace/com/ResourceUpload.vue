<template>
  <el-dialog class="ui-workspace-dialog" v-model="state.visible" width="420px">
    <template #header>
      <div style="font-size: large">{{ state.title }}</div>
    </template>
    <div v-loading="!!state.loadingText" :element-loading-text="state.loadingText">
      <el-form :model="state.form" :rules="state.rules" label-width="80px" ref="ruleFormRef">
        <el-form-item label="选择文件" prop="name">
          <el-button size="small" @click="handleUpload">选择文件</el-button>
        </el-form-item>
        <el-form-item label="已选列表">
          <div class="ui-workspace-file-list">
            <div class="ui-workspace-file-item" v-for="(item, index) in state.fileList">
              <div class="input">
                <el-input v-model="item.name" placeholder="名称" clearable />
              </div>
              <div class="action" @click="handleDelete(index)">
                <visui-icon name="ele-minus"></visui-icon>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer" style="text-align: right">
        <el-button size="small" @click="handleCloseDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'
import { ElMessage } from 'element-plus'
const apiHook = useDatavisApi()

const emit = defineEmits(['finish'])

const state = reactive({
  title: '上传组件',
  visible: false,
  folder: '',
  fileType: '',
  form: { sort: 0 },
  rules: {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  },
  loadingText: '',
  acceptFiles: [],
  fileList: [] as any
})

const handleOpenDialog = ({ title, form, folder, fileType }: any) => {
  state.loadingText = ''
  state.fileList = []
  state.visible = true
  state.title = title
  state.form = form
  state.folder = folder
  state.fileType = fileType
}
defineExpose({
  handleOpenDialog
})
const handleCloseDialog = () => {
  state.visible = false
}
const handleUpload = () => {
  const input = document.createElement('input') as HTMLInputElement
  input.type = 'file'
  input.multiple = 'multiple' as any
  input.accept = state.fileType
  input.onchange = (event: any) => {
    const files = event.target.files
    handleFiles(files)
  }
  input.click()
}

const handleDelete = (index: number) => {
  state.fileList.splice(index, 1)
}

const handleFiles = async (files: any) => {
  state.loadingText = '请稍候，正在处理中...'
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (state.fileType !== file.type) {
      state.loadingText = ''
      return ElMessage.error(`选中的文件含有不受支持的文件类型，目前仅支持${state.fileType}格式`)
    }
  }
  for (let i = 0; i < files.length; i++) {
    if (state.fileList.length >= 20) {
      state.loadingText = ''
      return ElMessage.error('最多同时上传20个文件!')
    }
    const file = files[i]
    state.fileList.push({
      type: file.type,
      file,
      name: file.name.substring(0, file.name.lastIndexOf('.'))
    })
  }
  state.loadingText = ''
}

const handleSubmit = () => {
  state.loadingText = '文件上传中...'
  handlePostUpload(state.fileList)
}

const renameFile = (file: any, name: any) => {
  const newFile = new File([file], `${name}.json`, { type: file.type })
  return newFile
}

const handlePostUpload = async (fileList: any) => {
  const paramData = [] as any
  const files = [] as any[]
  const filesLength = fileList.length - 1

  for (let i = 0; i < fileList.length; i++) {
    paramData.push({
      ...state.form,
      name: fileList[i].name,
      sort: state.form.sort + filesLength - i
    })
  }
  const [err, res] = await apiHook.saveResource(paramData)
  const resData = Array.isArray(res) ? res : [res]
  if (err) {
    state.loadingText = ''
    return
  }
  for (let i = 0; i < fileList.length; i++) {
    const file = renameFile(fileList[i].file, resData[i])
    files.push(file)
  }
  const [uploadErr, uploadRes]: any = await apiHook.uploadFiles(files, {
    folder: state.folder,
    isCover: true
  })
  if (uploadErr) {
    state.loadingText = ''
    return
  }
  const { urls } = uploadRes
  urls.forEach((url: string, index: number) => {
    paramData[index].url = url
    paramData[index].id = resData[index]
  })
  const [updateErr, updateRes] = await apiHook.saveResource(paramData)
  if (updateErr) {
    state.loadingText = ''
    return
  }
  handleCloseDialog()
  emit('finish')
}
</script>
