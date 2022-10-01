<template>
  <div class="user-remove" style="display:none">
    <div>
      <p>确认要删除吗？</p>
    </div>
    <div>
      <button @click="userRemoveSend">确认</button>
      <button @click="userRemoveHide">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    // 删除列表隐藏
    userRemoveHide() {
      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const userremove = document.querySelector('.user-remove')
      mask.style.display = 'none'
      userremove.style.display = 'none'
    },
    // 删除
    async userRemoveSend() {
      const id = this.id
      const { data: res } = await this.$http.delete('/users/' + id)
      if (res.status !== 200) return alert(res.message)

      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const userremove = document.querySelector('.user-remove')
      mask.style.display = 'none'
      userremove.style.display = 'none'
      this.$router.push('/home/users')
      location.reload()
    }
  }
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
