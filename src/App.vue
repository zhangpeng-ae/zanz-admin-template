<!-- src/App.vue -->
<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div style="text-align: center; margin-top: 10px">
    <el-button :icon="Search" circle></el-button>
    <el-button type="primary" :icon="Edit" circle></el-button>
    <el-button type="success" :icon="Check" circle></el-button>
    <el-button type="info" :icon="Message" circle></el-button>
    <el-button type="warning" :icon="Star" circle></el-button>
    <el-button type="danger" :icon="Delete" circle></el-button>
  </div>
  <svg-icon name="refresh" spin size="80" />
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  Delete,
} from '@element-plus/icons-vue'
</script>
