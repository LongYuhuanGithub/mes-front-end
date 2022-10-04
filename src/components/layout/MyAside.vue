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
export default {
  async created() {
    // 获取菜单列表
    const { data } = await this.$http.get('/menus')
    if (data.status !== 200) return alert(data.message)
    this.menuList = data.data

    // 页面刷新时，根据路径展开对应的目录与菜单的高亮
    this.currentPath = this.$route.path
    this.menuList.some(item => {
      const menu = item.children.find(item2 => this.currentPath === item2.url)
      if (menu) {
        this.unfoldId = menu.parent_id
        return true
      }
      return false
    })
  },
  data() {
    return {
      menuList: [], // 菜单列表
      unfoldId: 0, // 当前展开的目录ID
      currentPath: '' // 当前高亮的菜单路径
    }
  },
  methods: {
    // 切换菜单展开与关闭
    triggerMenu(id) {
      if (this.unfoldId === id) this.unfoldId = 0
      else this.unfoldId = id
    },
    // 点击菜单跳转路由
    jumpTo(url) {
      this.$router.push(url)
      this.currentPath = this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.my-aside {
  height: 100%;

  // 目录
  ul {
    height: 100%;
    text-align: left;

    li {
      width: 100%;
      min-height: 40px;
      line-height: 40px;
      text-indent: 15px;

      .arrows {
        float: right;
        margin-right: 10px;
        transform-origin: 24px center;
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
          text-indent: 30px;

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
    margin-right: 5px;
  }
}
</style>
