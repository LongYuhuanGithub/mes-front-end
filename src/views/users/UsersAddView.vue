<template>
  <div class="user-add" style="display:none">
    <div class="add-title">
      <p>用户增加</p>
    </div>
    <hr/>
    <div class="add-content">
      <div>
        <label for="">用户名称：</label><input type="text" name="username" v-model="username" placeholder="请输入用户名称">
      </div>
      <div>
        <label for="">密码：</label><input type="password" name="password" v-model="password" placeholder="请输入密码">
      </div>
      <div>
        <label for="">手机号码：</label><input type="tel" name="phone" v-model="phone" placeholder="请输入手机号码">
      </div>
      <div>
        <label for="">邮箱：</label><input type="email" name="email" v-model="email" placeholder="请输入邮箱">
      </div>
      <div>
        <label for="">性别：</label>
        <input type="radio" name="gender" v-model="gender" value="0">  男
        <input type="radio" name="gender" v-model="gender" value="1" checked>  女
        <input type="radio" name="gender" v-model="gender" value="2">  未知
      </div>
      <div>
        <label for="">备注：</label><input type="text" name="remark" v-model="remark" placeholder="请输入备注">
      </div>
      <div>
        <label for="">创建者名：</label><input type="text" name="create_by" v-model="create_by" placeholder="请输入创建者的用户名">
      </div>
      <div>
        <label for="">角色ID</label><input type="text" name="role_id" v-model="role_id" placeholder="请输入角色ID">
      </div>
      <div class="add-btn">
        <button @click="userAddSend">确认</button>
        <button @click="userAddHide">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '', // 用户名称
      password: '', // 密码
      email: '', // 邮箱
      phone: '', // 手机
      gender: '1', // 性别
      create_by: '', // 创建者的用户名
      remark: '', // 备注
      role_id: 1 // 角色ID
    }
  },
  methods: {
    // 增加列表隐藏
    userAddHide() {
      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const useradd = document.querySelector('.user-add')
      mask.style.display = 'none'
      useradd.style.display = 'none'
    },
    // 增加
    async userAddSend() {
      const url = '/users'
      const user = {
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        create_by: this.create_by,
        remark: this.remark,
        role_id: this.role_id
      }
      const { data } = await this.$http.post(url, user)
      if (data.status !== 200) return alert(data.message)

      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const useradd = document.querySelector('.user-add')
      mask.style.display = 'none'
      useradd.style.display = 'none'
      this.$router.push('/home/users')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-add{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;;
    width: 580px;
    height: 350px;
    padding: 10px;
    border: 1px solid #ccc;
    .add-title{
      font-size: 20px;
      text-align: left;
      padding: 10px 0 10px 20px;
    }
    .add-content{
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
      .add-btn{
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
