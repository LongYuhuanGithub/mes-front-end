<template>
  <div class="home-view">
    <!-- 头部 -->
    <header>
      <img src="@/assets/images/logo.png" alt="">
      <h2>MES制造执行系统</h2>
      <button @click="showLogout">退出登录</button>
    </header>
    <section>
      <!-- 主体内容 -->
      <main class="scroll-bar">
        <transition>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </main>
      <!-- 左侧导航区域 -->
      <aside class="scroll-bar">
        <MyAside></MyAside>
      </aside>
    </section>
    <!-- 遮罩层 -->
    <transition>
      <div class="mask" v-show="isShowMask">
        <MyLogout ref="myLogout" @close-mask="closeMask"></MyLogout>
      </div>
    </transition>
  </div>
</template>

<script>
import MyAside from '@/components/layout/MyAside'
import MyLogout from '@/components/layout/MyLogout'

export default {
  data() {
    return {
      isShowMask: false // 控制遮盖层的显示与隐藏
    }
  },
  methods: {
    // 显示退出登录对话框
    showLogout() {
      this.isShowMask = true
      this.$refs.myLogout.isShow = true
    },
    // 关闭遮盖层
    closeMask(type) {
      if (type === 'success') {
        sessionStorage.removeItem('mes_front_end_token')
        sessionStorage.removeItem('mes_front_end_userinfo')
        this.isShowMask = false
        this.$router.push('/login')
      } else if (type === 'close') this.isShowMask = false
    }
  },
  components: {
    MyAside,
    MyLogout
  }
}
</script>

<style lang="scss" scoped>
.home-view {
  height: 100%;

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
      background-color: #eee;

      &:hover {
        background-color: #bbb;
      }
    }
  }

  section {
    display: flex;
    margin-top: -60px;
    padding-top: 60px;
    height: 100%;

    // 主体内容
    main {
      flex: 1;
      padding: 10px;
      height: 100%;
      background-color: #ccc;

      // Transition 组件的过渡样式
      .v-enter-active,
      .v-leave-active {
        transition: all .5s ease-in-out;
      }

      .v-enter,
      .v-leave-to {
        position: absolute;
        width: 100%;
        transform: translateX(100%);
        opacity: 0;
      }
    }

    // 左侧导航区域
    aside {
      order: -1;
      width: 250px;
      height: 100%;
      background-color: #21252b;
      color: #abb2bf;
    }
  }

  // 遮盖层
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  // Transition 组件的过渡样式
  .v-enter-active,
  .v-leave-active {
    transition: all .3s;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
  }

  .v-enter-to,
  .v-leave {
    opacity: 1;
  }
}
</style>
