<template>
  <ul class="dj-search-info">
    <li>
      <span>姓名/警号：</span>
      <span>{{ info.name }}/{{ info.no }}</span>
    </li>
    <li>
      <span>单位：</span>
      <span>{{ info.unit }}</span>
    </li>
    <li>
      <span>政治生日：</span>
      <span>{{ info.birthday }}</span>
    </li>
  </ul>
</template>
<script>
// 查询信息
export default {
  name: 'search-info',
  props: {
    info: {
      type: Object,
      default() {
        return {
          name: '',
          no: '',
          unit: '',
          birthday: ''
        }
      }
    }
  }
}
</script>
<style lang="scss">
.dj-search-info {
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  color: #50616d;
  li {
    line-height: 35px;
    white-space: nowrap;
  }
}
</style>
