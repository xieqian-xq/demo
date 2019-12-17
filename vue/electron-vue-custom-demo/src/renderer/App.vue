<template>
  <div class="dj-box">
    <router-view />
    <app-update></app-update>
  </div>
</template>
<script>
import AppUpdate from './components/app-update'

export default {
  name: 'app',
  components: {
    'app-update': AppUpdate
  }
}
</script>
<style lang="scss">
@import '@/styles/common/index';
html,
body {
  height: 100%;
}

.dj-box {
  width: 1280px;
  height: 720px;
  margin: auto;
  overflow: hidden;
  background: #fffaf7 url(./assets/images/bg.jpg) center top no-repeat;
  background-size: 1280px;
}
</style>
