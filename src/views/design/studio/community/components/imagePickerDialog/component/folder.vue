<template>
  <el-dialog modal-append-to-body :title="state.title" v-model="state.visible" width="360px"
    :close-on-click-modal="false">
    <el-form ref="formRef" :model="state.form" :rules="state.rules" label-width="auto">
      <el-form-item label="父级目录" prop="parent_id" v-if="state.parentFlag">
        <visui-select v-model="state.form.parent_id" placeholder="请选择">
          <visui-option v-for="item in state.classData" :key="item.id" :label="item.name" :value="item.id" />
        </visui-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="state.form.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="state.form.sort" placeholder="请输入排序" clearable />
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
import { ref, reactive } from 'vue'
import datavisApi from '@/api/datavisApi'

const emit = defineEmits(['finish'])

const validateText = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入名称'))
  } else {
    const regex = /^[\u4e00-\u9fa5A-Za-z0-9_-]*$/;
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

    ],
  },
  parentFlag: false,
  loading: false,
  classData: [],
})

const handleOpenDialog = ({ form, classData, parentFlag, title }: any) => {
  state.form = form
  state.title = title
  state.parentFlag = parentFlag || false
  if (parentFlag) {
    state.classData = JSON.parse(JSON.stringify(classData))
    state.classData.unshift({ id: '', name: '根目录' })
  }
  state.visible = true
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
  state.loading = true
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      handlePost()
    }
  })
}

const handlePost = async () => {
  state.loading = true
  const [err] = await datavisApi.folders.save(state.form)
  state.loading = false
  if (!err) {
    state.visible = false
    emit('finish')
  }
}

</script>