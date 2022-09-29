<template>
  <div class="users-view">
    <div class="nav-bar">
      <div>登录名称：<input type="text"></div>
      <div>手机号码：<input type="text"></div>
      <div>用户状态：
          <select v-model="state" >
            <option value="0">正常</option>
            <option value="1">停用</option>
            <option value="['0','1']">所有</option>
          </select>
      </div>
      <div class="create-time">
        创建时间：<input type="datetime" placeholder="开始时间">-<input type="datetime" placeholder="结束时间">
      </div>
      <div class="search-reset">
        <button>搜索</button>
        <button>重置</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: '0'
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar{
    box-sizing: border-box;
    background-color: orange;
    margin: 20px;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;

    [type=text]{
      width: 250px;
      height: 25px;
      margin-right: 15px;
      margin-bottom: 15px;
      border-radius: 5px;
    }
    [type=datetime]{
      width: 120px;
      height: 25px;
      margin-right: 15px;
      border-radius: 5px;
    }
    .search-reset{
      button{
        width: 60px;
        height: 28px;
        border-radius: 15px;
        &:first-child{
          margin-right: 5px;
          background-color: green;
        }
        &:last-child{
          background-color: orange;
        }
      }
    }
  }
</style>
