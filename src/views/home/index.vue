<template>
  <div>home</div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

userStore.setToken('123')
</script>
<style scoped></style>
