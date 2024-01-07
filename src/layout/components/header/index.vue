<template>
  <div class="header">
    <div class="header-left flex items-center">
      <el-icon size="20" class="cursor-pointer mr-4" @click="menuSwitch">
        <Fold v-if="collapsed" />
        <Expand v-else />
      </el-icon>
      <el-icon class="mr-4" size="20"><RefreshRight /></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>DashboardConsole</el-breadcrumb-item>
        <el-breadcrumb-item>主控台</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right flex items-center">
      <el-icon size="20" class="cursor-pointer"><FullScreen /></el-icon>

      <el-dropdown @command="handleCommand">
        <div class="avatar cursor-pointer">
          <img :src="userInfo.avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="set">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-icon size="20" class="cursor-pointer"><Setting /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { ElMessage, ElMessageBox } from 'element-plus'
defineOptions({
  name: 'PageHeader',
})

interface Props {
  collapsed: boolean
}

const store = useUserStore()
const userInfo = store.getUserInfo

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const emit = defineEmits(['update:collapsed'])

const menuSwitch = () => {
  emit('update:collapsed', !props.collapsed)
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    dologout()
  }
}

const router = useRouter()
const route = useRoute()
const dologout = () => {
  ElMessageBox.confirm('确认退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      store.logout().then(() => {
        ElMessage.success('退出登录成功')
        router.replace({
          name: 'Login',
          query: {
            redirect: route.fullPath,
          },
        })
      })
    })
    .catch(() => {
      // do nothing
    })
}
</script>
<style lang="scss" scoped>
:deep(.el-dropdown-menu) {
  padding: 6px !important;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  height: 64px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: all 0.2s ease-in-out;
  width: 100%;

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #bbb;
    margin: 0 24px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
</style>
