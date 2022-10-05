import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [], // 菜单列表
    unfoldId: 0, // 当前展开的目录ID
    currentPath: '' // 当前高亮的菜单路径
  },
  getters: {},
  mutations: {
    // 修改菜单列表
    setMenuList(state, menuList) {
      state.menuList = menuList
    },
    // 修改当前展开的目录ID
    setUnfoldId(state, id) {
      state.unfoldId = id
    },
    // 根据路径高亮对应的菜单并展开对应的目录
    setActiveByPath(state, path) {
      state.currentPath = path
      state.menuList.some(item => {
        const menu = item.children.find(item2 => state.currentPath === item2.url)
        if (menu) {
          state.unfoldId = menu.parent_id
          return true
        }
        return false
      })
    }
  },
  actions: {},
  modules: {}
})
