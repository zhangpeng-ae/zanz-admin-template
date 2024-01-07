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

## git commit

```
feat: 新功能
fix: 修改 bug
docs: 文档
perf: 性能相关
refactor: 代码重构（不影响使用，内部结构的调整）
test: 测试用例
style: 样式修改
workflow: 工作流
build: 项目打包构建相关的配置修改
ci: 持续集成相关
revert: 恢复上一次提交（回滚）
wip: work in progress 工作中 还没完成
chore: 其他修改（不在上述类型中的修改）
release: 发版
deps: 依赖相关的修改
merge: 合并分支
```
