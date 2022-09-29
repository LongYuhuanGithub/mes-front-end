<template>
  <div class="home-view">
    <!-- 头部 -->
    <header>
      <h2>标题</h2>
      <button>退出登录</button>
    </header>
    <section>
      <!-- 主体内容 -->
      <div class="main">
        <router-view></router-view>
      </div>
      <!-- 左侧导航区域 -->
      <aside>
        <MyAside></MyAside>
      </aside>
    </section>
  </div>
</template>

<script>
import MyAside from '../components/MyAside.vue'
export default {
  components: { MyAside }
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
    background-color: skyblue;
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
      background-color: #d9d9d9;
    }

    // 左侧导航区域
    aside {
      order: -1;
      width: 200px;
      height: 100%;
      background-color: pink;
    }
  }
}
</style>
