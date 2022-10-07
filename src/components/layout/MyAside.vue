<template>
  <div class="my-aside">
    <!-- 目录 -->
    <ul>
      <li v-for="item in menuList" :key="item.id" @click.stop="triggerMenu(item.id)">
        <i :class="['iconfont', item.icon]"></i>
        <span>{{ item.menu_name }}</span>
        <i :class="['iconfont', 'icon-right', 'arrows', item.id === unfoldId ? 'down' : '']"></i>
        <!-- 菜单 -->
        <ul :class="['menu', item.id === unfoldId ? 'unfold' : '']">
          <li v-for="item2 in item.children" :key="item2.id" :class="item2.url === currentPath ? 'current' : ''" @click.stop="jumpTo(item2.url)">
            <i :class="['iconfont', item2.icon]"></i>
            <span>{{ item2.menu_name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  async created() {
    // 获取菜单列表
    const { data } = await this.$http.get('/menus')
    if (data.status !== 200) return alert(data.message)
    this.setMenuList(data.data)
  },
  methods: {
    ...mapMutations(['setMenuList', 'setUnfoldId', 'setActiveByPath']),
    // 切换菜单展开与关闭
    triggerMenu(id) {
      if (this.unfoldId === id) this.unfoldId = 0
      else this.setUnfoldId(id)
    },
    // 路由跳转
    jumpTo(url) {
      this.$router.push(url)
      this.setActiveByPath(this.$route.path)
    }
  },
  computed: {
    ...mapState(['menuList', 'unfoldId', 'currentPath'])
  },
  watch: {
    // 监听地址栏发生变化
    $route: {
      handler(newVal) {
        this.setActiveByPath(newVal.path)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
$vw: 19.2;

.my-aside {
  height: 100%;

  // 目录
  ul {
    height: 100%;
    text-align: left;

    li {
      width: 100%;
      min-height: (40vw / $vw);
      line-height: (40vw / $vw);
      text-indent: (15vw / $vw);
      cursor: pointer;

      .arrows {
        float: right;
        margin-right: (10vw / $vw);
        transform-origin: (24vw / $vw) center;
        transition: all .3s;

        &.down {
          transform: rotate(90deg);
        }
      }

      // 菜单
      .menu {
        height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all .5s;

        &.unfold {
          height: auto;
          opacity: 1;
        }

        li {
          text-indent: (30vw / $vw);
          cursor: pointer;

          &.current {
            color: #409eff;
          }

          &:hover {
            background-color: #2c313a;
          }
        }
      }
    }
  }

  .iconfont {
    margin-right: (5vw / $vw);
  }
}
</style>
