<template>
  <div class="user-update-view" style="display:none">
    <div class="update-title">
      <p>用户修改</p>
    </div>
    {{this.updatelist}}
    <hr/>
    <div class="update-content">
      <div>
        <label for="">ID：</label><input type="text" name="id"  v-model="id" :placeholder="this.updatelist.id">
      </div>
      <div>
        <label for="">手机号码：</label><input type="tel" name="phone" v-model="phone" :placeholder="this.updatelist.phone">
      </div>
      <div>
        <label for="">邮箱：</label><input type="email" name="email" v-model="email" :placeholder="this.updatelist.email">
      </div>
      <div>
        <label for="">性别：</label>
        <input type="radio" name="gender" v-model="gender" value="0">  男
        <input type="radio" name="gender" v-model="gender" value="1" checked>  女
        <input type="radio" name="gender" v-model="gender" value="2">  未知
      </div>
      <div>
        <label for="">备注：</label><input type="text" name="remark" v-model="remark" :placeholder="this.updatelist.remark">
      </div>
      <div>
        <label for="">角色ID：</label><input type="text" name="roleIds" v-model="roleIds" placeholder="请输入角色ID">
      </div>
      <div class="update-btn">
        <button @click="userUpdateSend">确认</button>
        <button @click="userUpdateHide">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.updatelist.id, // 用户ID
      email: '', // 邮箱
      phone: '', // 手机
      gender: '', // 性别
      remark: '', // 备注
      roleIds: ['1']// 角色ID的数组
    }
  },
  props: ['updatelist'],
  methods: {
    // 增加列表隐藏
    userUpdateHide() {
      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const userupdate = document.querySelector('.user-update-view')
      mask.style.display = 'none'
      userupdate.style.display = 'none'
    },
    // 修改
    async userUpdateSend() {
      const user = {
        id: this.id,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        remark: this.remark,
        roleIds: this.roleIds
      }
      const { data: res } = await this.$http.put('users', user)
      if (res.status !== 200) return alert(res.message)

      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const userupdate = document.querySelector('.user-update-view')
      mask.style.display = 'none'
      userupdate.style.display = 'none'
      this.$router.push('/home/users')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-update-view{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;;
    width: 580px;
    height: 350px;
    padding: 10px;
    border: 1px solid #ccc;
    .update-title{
      font-size: 20px;
      text-align: left;
      padding: 10px 0 10px 20px;
    }
    .update-content{
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      justify-content: space-between;
      align-items: center;
      div{
        font-size: 14px;
        & :not([type=radio]){
          width: 180px;
          height: 25px;
          margin-bottom: 20px;
        }

        [type=text],[type=tel],[type=password],[type=email]{
          border: 1px solid #ccc;
          padding-left: 10px;
        }

        [type=radio]{
          margin-left: 25px;
        }
      }
      .update-btn{
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        button{
          width: 100px;
          height: 40px;
          color: white;
          &:first-child{
            background-color: blue;
          }
          &:last-child{
            background-color: rgb(37, 207, 37);
          }
        }
      }
    }
  }
</style>
