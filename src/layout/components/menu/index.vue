<template>
  <el-menu class="layout-aside-menu" default-active="1-1" :collapse="collapsed">
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
</template>
<script setup lang="ts">
import { withDefaults } from 'vue'
defineOptions({
  name: 'PageMenu',
})

interface Props {
  collapsed: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
})
</script>

<style lang="scss">
.el-menu {
  background-color: transparent;
  border: none;
}
.el-menu--popup {
  background-color: #001428 !important;
}

.el-menu-item,
.el-sub-menu__title {
  color: #a5acb3;
  &:hover {
    color: #fff;
    background-color: transparent;
  }
}

.el-menu-item.is-active {
  color: #fff !important;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 6px;
    right: 6px;
    bottom: 0;
    background-color: var(--el-color-primary);
    z-index: -1;
    border-radius: 2px;
  }
}
</style>
<style lang="scss" scoped>
.layout-aside-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
