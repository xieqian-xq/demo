# Electron

> 基于 `electron-vue` 模板改造

## 需要注意的问题

### 1、中文路径

当文件路径有含有中文时，可能会导致打包出错

### 2、electron 开发环境

在 electron 内部，会有命令去执行 npm install.js，可能会因为某些原因执行失败

此时需要多注意下，由于在开发的时候遇到了一些坑，所以在此先准备了一个完整的[`electron@7.1.3`](./static/electron@7.1.3)
