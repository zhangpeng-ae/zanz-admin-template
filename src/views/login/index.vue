<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <img :src="loginImage" alt="" />
        </div>
        <div class="view-account-top-desc">Zanz-admin后台管理系统</div>
      </div>
      <div class="view-account-form">
        <el-form
          ref="formRef"
          label-position="left"
          size="large"
          :model="loginForm"
          :rules="loginRules"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text">
              <template #prefix>
                <el-icon size="18" color="#808695"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :type="passwordType">
              <template #prefix>
                <el-icon size="18" color="#808695"><Lock /></el-icon>
              </template>
              <template #suffix>
                <el-icon
                  size="18"
                  color="#808695"
                  class="eyes cursor-pointer"
                  @click="switchVisible"
                >
                  <Hide v-if="isVisible" />
                  <View v-else />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item class="default-color">
            <div class="flex justify-between">
              <div class="mr-2">
                <el-checkbox v-model:checked="autoLogin">自动登录</el-checkbox>
              </div>
              <div>
                <a href="javascript:">忘记密码</a>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              size="large"
              block
              type="primary"
              class="w-full"
              @click="handleLogin"
              :loading="butLoading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { FormInstance, ElMessage } from 'element-plus'
import { validatePassword } from './index'
import loginImage from '@/assets/images/account-logo.png'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const formRef = ref<FormInstance | null>(null)

const passwordType = computed(() => {
  return isVisible.value ? 'text' : 'password'
})

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

const isVisible = ref(false)

const switchVisible = () => {
  isVisible.value = !isVisible.value
}

const autoLogin = ref(true)

const butLoading = ref(false)

const handleLogin = async (e) => {
  e.preventDefault()

  formRef.value?.validate(async (errors) => {
    if (errors) {
      butLoading.value = true

      const { username, password } = loginForm.value
      const params = {
        username,
        password,
      }

      try {
        await userStore.login(params)
        ElMessage.success('登录成功，即将进入系统')
        const toPath = decodeURIComponent(
          (route.query?.redirect || '/') as string,
        )
        setTimeout(() => {
          if (route.name === '/login') {
            router.replace('/')
          } else router.replace(toPath)
        }, 1000)
      } finally {
        butLoading.value = false
      }
    } else {
      ElMessage.error('请填写完整信息，并且进行验证码校验')
    }
  })
}
</script>
<style lang="scss" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}
@media (min-width: 768px) {
  .view-account {
    background-image: url('@/assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
