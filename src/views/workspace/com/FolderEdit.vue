<template>
  <el-dialog :title="state.title" v-model="state.visible" width="360px" :close-on-click-modal="false">
    <el-form ref="formRef" :model="state.form" :rules="state.rules" label-width="auto">
      <el-form-item label="父级目录" v-if="state.depth > 1">
        <el-tree-select
          v-model="state.form.parent_id"
          node-key="id"
          clearable
          :append-to="popupEl"
          :props="{ label: 'name', children: 'folders' }"
          :data="state.classData"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input ref="inputRef" v-model="state.form.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="state.form.sort" placeholder="请输入排序" class="full-width" controls-position="right" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">关 闭</el-button>
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { useDatavisApi } from '../hooks/useDatavisApi'
const popupEl = inject('popupEl') as any
const apiHook = useDatavisApi()

const emit = defineEmits(['finish'])

const validateText = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入名称'))
  } else {
    const regex = /^[\u4e00-\u9fa5A-Za-z0-9_-]*$/
    if (!regex.test(value)) {
      callback(new Error('名称只能包含中文、英文、数字、下划线(_)和短横线(-)的组合，不能包含空格或其他特殊字符！'))
    }
    callback()
  }
}

const state = reactive({
  title: '',
  visible: false,
  loadingText: '',
  form: {} as any,
  rules: {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { validator: validateText, trigger: 'blur' }
    ]
  },
  loading: false,
  classData: [] as any[],
  depth: 1 // 目录深度限制，默认为1层目录（即顶级分类）
})

const inputRef = ref()
const handleOpenDialog = ({ form, classData, title, depth }: any) => {
  state.form = form
  state.title = title
  state.classData = JSON.parse(JSON.stringify(classData || []))
  state.classData.unshift({ name: '根目录', id: '' })
  state.depth = depth || 1
  state.visible = true
  setTimeout(() => {
    inputRef.value.select()
    formRef.value.clearValidate()
  }, 16)
}

const handleCloseDialog = () => {
  state.visible = false
}

defineExpose({
  handleOpenDialog,
  handleCloseDialog
})

const formRef = ref()

const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      handlePost()
    }
  })
}

const handlePost = async () => {
  state.loading = true
  const [err] = await apiHook.saveFolders(state.form)
  state.loading = false
  if (!err) {
    state.visible = false
    emit('finish')
  }
}
</script>
