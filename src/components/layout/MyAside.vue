<template>
  <div class="my-aside">
    <!-- 目录 -->
    <ul>
      <li v-for="item in menuList" :key="item.id" @click.stop="triggerMenu(item.id)">
        <i :class="['iconfont', item.icon]"></i>
        <span>{{ item.menu_name }}</span>
        <i :class="['iconfont', 'icon-right', 'arrows', item.id === showId ? 'down' : '']"></i>
        <!-- 菜单 -->
        <ul :class="['menu', item.id === showId ? 'current' : '']">
          <li v-for="item2 in item.children" :key="item2.id" @click.stop="$router.push(item2.url)">
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
    const { data } = await this.$http.get('/menus')
    if (data.status !== 200) return alert(data.message)
    this.menuList = data.data
  },
  data() {
    return {
      menuList: [], // 菜单列表
      showId: 0 // 当前展开的目录ID
    }
  },
  methods: {
    // 切换菜单展开与关闭
    triggerMenu(id) {
      if (this.showId === id) this.showId = 0
      else this.showId = id
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
        opacity: 0;
        height: 0;
        overflow: hidden;
        transition: all .5s;

        &.current {
          opacity: 1;
          height: auto;
        }

        li {
          text-indent: 30px;

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
