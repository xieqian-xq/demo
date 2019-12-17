<template>
  <div class="app-update">app更新组件</div>
</template>
<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'app-update',
  mounted() {},
  created() {
    this.listen()
    ipcRenderer.send('checkForUpdate')
  },
  methods: {
    listen() {
      ipcRenderer.on('update-message', (event, res) => {
        this.notify(res)
      })

      ipcRenderer.on('update-progress', (event, res) => {
        console.log(res)
      })

      ipcRenderer.on('update-downloaded', () => {
        this.downloaded()
      })
    },
    notify(res) {
      if (res.type) {
        this.$notify({
          title: '提示',
          message: res.msg,
          position: 'bottom-right'
        })
      } else {
        console.log(res.msg)
      }
    },
    downloaded() {
      this.$confirm('新版本下载完成，是否立即安装？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        ipcRenderer.send('install')
      })
    }
  }
}
</script>
<style lang="scss">
.app-update {
  display: none;
}
</style>
