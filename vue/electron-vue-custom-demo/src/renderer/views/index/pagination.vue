<template>
  <div class="dj-pagination">
    <transition name="el-fade-in-linear">
      <i
        class="dj-pagination-icon el-icon-d-arrow-right"
        :class="{ disabled: !isShowNextBtn }"
        title="下一页"
        @click="next"
      ></i>
    </transition>
    <transition name="el-fade-in-linear">
      <i
        class="dj-pagination-icon el-icon-d-arrow-left"
        :class="{ disabled: !isShowPrevBtn }"
        title="上一页"
        @click="prev"
      ></i>
    </transition>
  </div>
</template>
<script>
// 分页
export default {
  name: 'pagination',
  props: {
    pageIndex: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isShowPrevBtn() {
      return this.pageIndex > 1
    },
    isShowNextBtn() {
      let crtSize = this.pageIndex * this.pageSize
      return crtSize < this.total
    }
  },
  methods: {
    prev() {
      if (this.isShowPrevBtn) {
        this.print()
        this.$emit('on-prev')
      }
    },
    next() {
      if (this.isShowNextBtn) {
        this.print()
        this.$emit('on-next')
      }
    },
    print() {
      if (process.env.NODE_ENV !== 'production') {
        console.log(this.pageIndex)
        console.log(this.pageSize)
        console.log(this.total)
      }
    }
  }
}
</script>
<style lang="scss">
.dj-pagination {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-left: 10px;
  &-icon {
    font-size: 50px;
    color: #d70000;
    line-height: 70px;
    cursor: pointer;
    transition: 0.3s;
    &.disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  }
}
</style>
