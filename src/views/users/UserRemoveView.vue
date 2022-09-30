<template>
  <div class="user-remove" style="display:none">
    <div>
      <p>确认要删除吗？</p>
    </div>
    <div>
      <button>确认</button>
      <button>返回</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .user-remove{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    height: 100px;
    background-color: white;
    padding: 20px;
    font-size: 16px;
    button{
      width: 80px;
      height: 30px;
      margin: 10px;
      color: white;
      &:first-child{
        background-color: red;
      }
      &:last-child{
        background-color: rgb(37, 207, 37);
      }
    }
  }
</style>
