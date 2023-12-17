<template>
  <div class="login-container">
    <div class="login-form shadow-2xl bg-white rounded-lg p-4">
      <div class="admin-title">zanz-admin</div>
      <el-form ref="formRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <span class="title">用户名</span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="title">密码</span>
          <el-input
            v-model="loginForm.password"
            name="password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleLogin" class="w-full">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/user'
import { FormInstance, ElMessage } from 'element-plus'
import { validatePassword } from './index'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const formRef = ref<FormInstance | null>(null)

const loginForm = ref({
  username: 'admin',
  password: '123456',
})

const loginRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, trigger: 'blur', validator: validatePassword() },
  ],
})

const handleLogin = async () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    const data = await login(loginForm.value)
    if (data) {
      const { token, userInfo } = data
      store.setToken(token)
      store.setUserInfo(userInfo)
      ElMessage.success('登录成功')

      setTimeout(() => {
        router.push('/')
      }, 1000)
    }
  })
}
</script>
<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/images/login.png') no-repeat center;
  background-size: cover;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  min-height: 400px;
}

.admin-title {
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  font-weight: bold;
}
</style>
