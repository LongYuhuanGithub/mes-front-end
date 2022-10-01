<template>
  <div class="aside-view">
    <ul class="catalog-li">
      <li><router-link to="/home/welcome">首页</router-link></li>
      <li>
        系统管理
        <ul class="menus-li" @click="hide">
          <li><router-link to="/home/users">用户管理</router-link></li>
          <li><router-link to="/home/roles">角色管理</router-link></li>
          <!-- <li><router-link to="/home/menus">菜单管理</router-link></li>
          <li><router-link to="/home/departments">部门管理</router-link></li>
          <li><router-link to="/home/positions">岗位管理</router-link></li>
          <li><router-link to="/home/dictionaries">字典管理</router-link></li>
          <li><router-link to="/home/parameters">参数设置</router-link></li>
          <li><router-link to="/home/notifications">通知公告</router-link></li>
          <li><router-link to="/home/logs">日志管理</router-link></li> -->
        </ul>
      </li>
      <li>系统监控</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    hide() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .catalog-li{
    font-size: 16px;
    text-align: left;
    padding: 10px 0;
    a{
      display: block;
      width: 200px;
      text-align: left;
      padding: 10px 20px;
      &:hover{
        background-color: orange;
      }
    }
    .menus-li a{
      display: block;
      width: 200px;
      text-align: left;
      padding: 10px 20px;
      &:hover{
        background-color: orange;
      }
    }
  }
</style>
