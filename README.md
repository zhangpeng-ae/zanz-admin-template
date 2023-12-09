# zanz-admin

使用 Vue 3 + TypeScript + Vite + Element Plus 开发的后台管理系统模板

## 安装使用

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
pnpm serve
```

- 打包

```bash
pnpm build
```

## 使用SvgIcon

- 在`src/assets/icons/`目录下放入svg图标文件
- 在需要使用的地方使用`<svg-icon icon-class="svg文件名" />`即可
- spin 属性为true时，图标会旋转
- size 属性为图标大小，默认为 1em

```javascript
<template>
  <div>
     <svg-icon name="图标文件名" spin></svg-icon>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
</script>
```
