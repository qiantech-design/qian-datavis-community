<template>
  <div class="ui-workspace-wrap">
    <div class="ui-workspace-login-container">
      <div class="ui-workspace-login-logo">
        <img src="/static/datavis/img/logo.png" alt="" />
      </div>
      <div class="ui-workspace-login-flex">
        <div class="ui-workspace-login-img">
          <img src="/static/datavis/img/login-left.svg" alt="" />
        </div>
        <div class="ui-workspace-login-form">
          <div class="ui-workspace-login-form-content">
            <div class="ui-workspace-login-form-title">登录</div>
            <el-form :model="state.form" ref="formRef" @submit.prevent>
              <el-form-item prop="mobileOrEmail">
                <el-input v-model="state.form.user" placeholder="请输入用户名" size="large" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="state.form.password" type="password" autocomplete="new-password" show-password
                  placeholder="请输入密码" size="large" @keyup.enter="handleLogin" />
              </el-form-item>
              <el-form-item>
                <button class="ui-workspace-button full-width" :loading="state.loading" @click="handleLogin">
                  <span>登录</span>
                </button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SparkMD5 from 'spark-md5'
import { ElMessage } from 'element-plus'
import datavisApi from '@/api/datavisApi'
const router = useRouter()

const state = reactive({
  loading: false,
  title: 'datavis',
  activeLoginType: 'phone',
  form: {
    user: '',
    password: ''
  }
})
const md5Encrpit = (str: string) => {
  return SparkMD5.hash(str)
}
const formRef = ref()
const handleLogin = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      handlePost()
    }
  })
}
const handlePost = async () => {
  state.loading = true
  const data = {
    user: state.form.user,
    password: md5Encrpit(state.form.password)
  }
  const [err, res] = await datavisApi.account.login(data)
  if (err) {
    state.loading = false
    return
  }
  state.loading = false
  ElMessage.success({ message: '登录成功' })
  localStorage.setItem('DATAVIS_OPEN_TOKEN', res.token)
  localStorage.setItem('DATAVIS_USER', res.user)
  router.push({
    path: '/home'
  })

}

</script>