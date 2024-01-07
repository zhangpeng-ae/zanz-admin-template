<template>
  <el-container class="layout">
    <el-aside class="layout-aside">
      <div class="logo">
        <img :src="logo" class="mr-2" />
        <h2 class="title" v-show="!isCollapse">ZanzAdmin</h2>
      </div>
      <el-scrollbar height="calc(100vh - 64px)">
        <PageMenu :collapsed="isCollapse" />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <PageHeader v-model:collapsed="isCollapse" />
      </el-header>
      <el-main class="layout-main">
        <PageMain />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import PageHeader from '@/layout/components/header/index.vue'
import PageMenu from '@/layout/components/menu/index.vue'
import PageMain from '@/layout/components/main/index.vue'
defineOptions({
  name: 'Layout',
})
import { ref } from 'vue'

const isCollapse = ref(false)
</script>
<style lang="scss" scoped>
:deep(.el-header) {
  padding: 0;
}
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
  }

  .layout-main {
    background-color: #f5f7f9;
    padding: 12px;
  }
}
</style>
