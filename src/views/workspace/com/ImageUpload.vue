<template>
  <el-dialog class="file-upload-dialog" v-model="state.visible" width="720px">
    <template #header>
      <div style="font-size: large; display: inline-block">上传图片</div>
    </template>
    <div>
      <div class="upload-dialog-body" v-loading="!!state.loadingText" :element-loading-text="state.loadingText">
        <div
          class="empty-wrap"
          :class="{ 'is-dragover': state.isDragover }"
          @click="handleOpenFile"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          v-if="!state.fileList.length"
        >
          <div class="enum-file-type-wrap">
            <img :src="emptyScreenUrl" />
          </div>
          <div class="tip-text primary-color">点击或拖拽上传图片</div>
          <div style="margin-top: 6px">仅支持图片格式文件上传，支持批量上传</div>
        </div>
        <el-scrollbar v-if="state.fileList.length">
          <div class="preview-files-wrap">
            <div
              v-if="state.fileList.length < 20"
              class="preview-item"
              @click="handleOpenFile"
              @drop="handleDrop"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
            >
              <div class="preview-item-inner preview-item-action" :class="{ 'is-dragover': state.isDragover }">
                <visui-icon name="vis-tianjia" class="primary-color" style="font-size: 24px"></visui-icon>
                <span class="primary-color" style="margin-top: 6px">添加</span>
              </div>
            </div>
            <div class="preview-item" v-for="(item, index) in state.fileList" :key="index">
              <div class="preview-item-inner">
                <div class="image-item-wrap">
                  <el-image :src="item.src" fit="contain" v-if="item.type.startsWith('image/')"></el-image>
                  <div class="image-item-backdrop">
                    <el-button type="danger" size="small" @click="handleDeleteFile(index)">删除</el-button>
                  </div>
                </div>
                <el-input v-model="item.name" placeholder="请输入图片名称"></el-input>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer" style="text-align: right">
        <el-button size="small" @click="handleCloseDialog">取 消</el-button>
        <el-button size="small" type="primary" :loading="state.loading" @click="handleSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'
import { ElMessage } from 'element-plus'

const apiHook = useDatavisApi()
const emit = defineEmits(['finish'])
const emptyScreenUrl = ref('')
const state = reactive({
  visible: false,
  isDragover: false,
  loading: false,
  loadingText: '', // 加载中显示的文本
  folder: '',
  form: { id: '', name: '', sort: 0 },
  rules: {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  },
  acceptFiles: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml', 'video/mp4'],
  fileList: [] as any
})
const acceptFilesStr = computed(() => {
  return state.acceptFiles
    .map((a: any) => a.split('/')[1])
    .map((a: any) => (a === 'svg+xml' ? 'svg' : a))
    .join('、')
})

const handleOpenDialog = ({ folder, form }: any) => {
  state.loadingText = ''
  state.isDragover = false
  state.visible = true
  state.fileList = []
  state.folder = folder
  state.form = form
}
defineExpose({
  handleOpenDialog
})
const handleCloseDialog = () => {
  state.visible = false
}

const handleOpenFile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '*/image'
  input.onchange = (event: any) => {
    const files = event.target.files
    handleFiles(files)
  }
  input.click()
}

const handleFiles = async (files: any) => {
  state.loadingText = '请稍候，正在处理中...'
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!state.acceptFiles.includes(file.type)) {
      state.loadingText = ''
      return ElMessage.error(`选中的文件含有不受支持的文件类型，目前仅支持${acceptFilesStr.value}格式`)
    }
  }
  for (let i = 0; i < files.length; i++) {
    if (state.fileList.length >= 20) {
      state.loadingText = ''
      return ElMessage.error('最多同时上传20个文件！')
    }
    const file = files[i]
    getFileImage(file)
      .then((data: any) => {
        state.fileList.push({
          type: file.type,
          file,
          name: file.name.substring(0, file.name.lastIndexOf('.')),
          src: data
        })
      })
      .catch(() => {
        state.loadingText = ''
      })
  }
  state.loadingText = ''
}

const getFileImage = (file: any) => {
  return new Promise((resolve, reject) => {
    if (file.type === 'application/json') {
      const fileReader = new FileReader()
      fileReader.onloadend = e => {
        const result = e.target?.result?.toString() || ''
        const parseResult = JSON.parse(result)
        const { canvasConfig, frontend, screen, backend } = parseResult
        if (!canvasConfig || !frontend || !screen || !backend) {
          ElMessage.error(`文件【${file.name}】格式错误`)
          return reject('')
        }
        resolve('')
      }
      fileReader.readAsText(file)
    } else {
      const fileReader = new FileReader()
      fileReader.onloadend = e => {
        resolve(e.target?.result)
      }
      fileReader.readAsDataURL(file)
    }
  })
}

const handleDeleteFile = (index: number) => {
  state.fileList.splice(index, 1)
}
const handleDrop = (e: any) => {
  state.isDragover = false
  e.preventDefault()
  e.stopPropagation()
  const files = e.dataTransfer.files
  handleFiles(files)
}
const handleDragOver = (e: any) => {
  state.isDragover = true
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
const handleDragLeave = () => {
  state.isDragover = false
}
const handleSubmit = async () => {
  state.loading = true
  const { fileList } = state
  const listData = [] as any
  const files = []
  for (let i = 0; i < fileList.length; i++) {
    files.push(fileList[i].file)
  }
  const [uploadErr, uploadRes]: any = await apiHook.uploadFiles(files, {
    folder: state.folder,
    isCover: 0
  })
  if (!uploadErr) {
    const { urls } = uploadRes
    const urlsLength = urls.length - 1

    urls.forEach((url: string, index: number) => {
      const obj = {
        ...state.form,
        name: fileList[index].name,
        url,
        sort: state.form.sort + urlsLength - index
      }
      listData.push(obj)
    })
    const [saveErr] = await apiHook.saveResource(listData)
    if (saveErr) {
      ElMessage.error('上传失败')
    } else {
      ElMessage.success('上传成功')
      handleCloseDialog()
      emit('finish')
    }
  }
  state.loading = false
}
</script>
