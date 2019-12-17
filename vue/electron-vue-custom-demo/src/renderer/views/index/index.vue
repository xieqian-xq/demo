<template>
  <el-container class="dj-layout">
    <el-main>
      <el-row :gutter="0" class="height-full">
        <el-col :span="6" class="height-full">
          <div class="dj-search">
            <div class="dj-search-face" :class="{ active: isShowSearchInfo }"></div>
            <div class="dj-search-input">
              <el-input v-model="input" placeholder="姓名/警号"></el-input>
              <el-button type="warning" @click="search">查询</el-button>
            </div>
            <transition name="el-fade-in-linear">
              <!-- 个人信息 -->
              <search-info v-show="isShowSearchInfo" :info="policeInfo"></search-info>
            </transition>
          </div>
        </el-col>
        <el-col :span="18" class="height-full">
          <div v-if="isShowSearchInfo" class="dj-result-wrapper">
            <ul class="dj-result">
              <li v-for="(item, index) in result.list" :key="index" class="dj-result-item">
                <i class="dj-result-item__icon" :class="[`no${item.level}`]"></i>
                <div class="dj-result-item__content">
                  <span class="dj-result-item__content-title">{{item.level}}</span>
                  <span class="dj-result-item__content-date">{{item.date}}</span>
                </div>
              </li>
            </ul>
            <!-- 分页 -->
            <pagination
              :page-index="result.pageIndex"
              :page-size="result.pageSize"
              :total="result.total"
              @on-prev="prev"
              @on-next="next"
            ></pagination>
          </div>
          <div v-else class="dj-result-default"></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import Pagination from './pagination'
import SearchInfo from './search-info'

export default {
  name: 'index',
  components: {
    pagination: Pagination,
    'search-info': SearchInfo
  },
  data() {
    return {
      searchCount: 0,
      input: '',
      policeInfo: {
        name: '李福',
        no: '08751',
        unit: '公安局天河分局公安局天河分局',
        birthday: '20171001'
      },
      result: {
        total: 20,
        pageIndex: 1,
        pageSize: 4,
        list: [
          { level: 1, title: '一等功', date: '20191101' },
          { level: 2, title: '二等功', date: '20191001' },
          { level: 2, title: '二等功', date: '20190801' },
          { level: 3, title: '一等功', date: '20190401' }
        ]
      }
    }
  },
  computed: {
    isShowSearchInfo() {
      return this.searchCount > 0
    }
  },
  methods: {
    search() {
      let loadingInstance = this.$loading.service({
        fullscreen: true,
        lock: true,
        background: 'rgba(255, 255, 255, 0.4)',
        text: '正在查询中'
      })

      setTimeout(() => {
        this.searchCount++
        loadingInstance.close()
      }, 1000)
    },
    prev() {
      this.result.pageIndex--
    },
    next() {
      this.result.pageIndex++
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/common/_variables.scss';
@import '@/styles/common/_mixins.scss';

.height-full {
  height: 100%;
}
.dj-layout {
  height: 100%;
}

// 左侧查询
.dj-search {
  width: 240px;
  height: 100%;
  margin: auto;
  overflow: hidden;
  &-face {
    width: 180px;
    height: 180px;
    background: url(../../assets/images/face.png) center center no-repeat;
    background-size: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 225px;
    transition: 0.3s;
    &.active {
      margin-top: 170px;
    }
  }
  &-input {
    display: flex;
    margin-top: 10px;
    input {
      border-radius: 4px 0 0 4px;
    }
    button {
      border-radius: 0 4px 4px 0;
    }
  }
}

// 右侧结果
.dj-result-wrapper {
  display: flex;
}

// 右侧结果 - 初始化
.dj-result-default {
  width: 90%;
  height: 100%;
  background: url(../../assets/images/index.png) center top no-repeat;
  background-size: 100%;
}

// 右侧结果 - 主体
.dj-result {
  width: 0;
  flex: 1;
  margin-top: 70px;
  margin-left: 150px;
  &-item {
    width: 100%;
    display: flex;
    align-items: center;
    &__icon {
      width: 70px;
      height: 100px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 95%;
      &.no1 {
        background-image: url(../../assets/images/no1.png);
      }
      &.no2 {
        background-image: url(../../assets/images/no2.png);
      }
      &.no3 {
        background-image: url(../../assets/images/no3.png);
      }
    }
    &__content {
      flex: 1;
      width: 0;
      height: 55px;
      border: 2px solid #a10000;
      background-color: #fff;
      color: #d70000;
      font-size: 20px;
      font-weight: 700;
      margin-left: 20px;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        line-height: 51px;
      }
    }
  }
}
</style>
