<template>
  <el-menu
    class="layout-aside-menu"
    :default-active="defaultActive"
    :collapse="collapsed"
  >
    <el-sub-menu :index="item.name" v-for="item in menuList" :key="item.name">
      <template #title>
        <el-icon><Odometer /></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children.length">
        <el-menu-item
          :index="child.name"
          v-for="child in item.children"
          :key="child.name"
          @click="toRouter(child.name)"
        >
          {{ child.meta.title }}
        </el-menu-item>
      </template>
    </el-sub-menu>
  </el-menu>
</template>
<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import { useRouter } from 'vue-router'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'

defineOptions({
  name: 'PageMenu',
})

interface Props {
  collapsed: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const asyncRouteStore = useAsyncRouteStore()
const menuList: any[] = asyncRouteStore.getMenus
console.log(
  '%c [ menuList ]-44',
  'font-size:13px; background:pink; color:#bf2c9f;',
  menuList,
)

const defaultActive = ref('')
if (menuList.length) {
  defaultActive.value = menuList[0].children
    ? menuList[0].children[0].name
    : menuList[0].name
}

const router = useRouter()
const toRouter = (name: string) => {
  router.push({
    name,
  })
}
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
