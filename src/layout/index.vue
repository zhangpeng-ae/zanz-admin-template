<template>
  <el-container class="layout">
    <el-aside class="layout-aside">
      <div class="logo">
        <img :src="logo" class="mr-2" />
        <h2 class="title" v-show="!isCollapse">ZanzAdmin</h2>
      </div>
      <el-scrollbar height="calc(100vh - 64px)">
        <el-menu
          class="layout-aside-menu"
          default-active="1-1"
          :collapse="isCollapse"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Odometer /></el-icon>
              <span>Dashboard</span>
            </template>
            <el-menu-item index="1-1">主控台</el-menu-item>
            <el-menu-item index="1-2">工作台</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Operation /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="2-1">菜单权限管理</el-menu-item>
            <el-menu-item index="2-2">角色权限管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left flex items-center">
          <el-icon size="20" class="cursor-pointer mr-4" @click="menuSwitch">
            <Fold v-if="isCollapse" />
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
          <div class="avatar cursor-pointer"></div>
          <el-icon size="20" class="cursor-pointer"><Setting /></el-icon>
        </div>
      </el-header>
      <el-main class="layout-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import logo from '@/assets/images/logo.png'
defineOptions({
  name: 'Layout',
})

const isCollapse = ref(false)

const menuSwitch = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  .layout-aside {
    background-color: #001428;
    color: #fff;
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
    width: auto;
    overflow: hidden;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
      img {
        width: auto;
        height: 32px;
      }
    }
    .layout-aside-menu:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  .layout-header {
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
    }
  }
  .layout-main {
    background-color: #f5f7f9;
    padding: 12px;
  }
}
</style>
