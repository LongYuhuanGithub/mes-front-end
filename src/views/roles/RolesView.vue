<template>
  <div class="roles-view">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span @click="jumpTo('/home/welcome')"><a href="javascript:void(0)">首页</a></span>
      <i class="iconfont icon-right"></i>
      <span>系统管理</span>
      <i class="iconfont icon-right"></i>
      <span>角色管理</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setActiveByPath']),
    // 路由跳转
    jumpTo(url) {
      this.$router.push(url)
      this.setActiveByPath(this.$route.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.roles-view {
}
</style>
