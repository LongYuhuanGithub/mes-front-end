<template>
  <div class="home-view">
    <MyMessage message="skdgnspdijfd"></MyMessage>
    <!-- 头部 -->
    <header>
      <img src="@/assets/images/logo.png" alt="">
      <h2>MES制造执行系统</h2>
      <button @click="logout">退出登录</button>
    </header>
    <section>
      <!-- 主体内容 -->
      <div class="main scroll-bar">
        <router-view></router-view>
      </div>
      <!-- 左侧导航区域 -->
      <aside class="scroll-bar">
        <MyAside></MyAside>
      </aside>
    </section>
  </div>
</template>

<script>
import MyAside from '@/components/layout/MyAside'
import MyMessage from '@/components/global/MyMessage'

export default {
  methods: {
    logout() {
      sessionStorage.removeItem('mes_front_end_token')
      sessionStorage.removeItem('mes_front_end_userinfo')
      this.$router.push('/login')
    }
  },
  components: {
    MyAside,
    MyMessage
  }
}
</script>

<style lang="scss" scoped>
.home-view {
  text-align: center;

  // 头部
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 60px;
    background-color: #323844;
    color: #eee;

    img {
      height: 60px;
    }

    button {
      background-color: #bbb;

      &:hover {
        background-color: #eee;
      }
    }
  }

  section {
    display: flex;
    margin-top: -60px;
    padding-top: 60px;
    height: 100%;

    // 主体内容
    .main {
      flex: 1;
      height: 100%;
      background-color: #969696;
    }

    // 左侧导航区域
    aside {
      order: -1;
      width: 250px;
      height: 100%;
      background-color: #21252b;
      color: #abb2bf;
      overflow: auto;
    }
  }
}
</style>
