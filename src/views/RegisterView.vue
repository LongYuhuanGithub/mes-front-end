<template>
  <div class="register-view">
    <div class="register">
      <div class="register-title">注册小工单</div>
      <div class="reg-form">
        <input type="text" name="username" v-model="user.username" placeholder="用户名："><br>
        <input type="password" name="password" v-model="user.password" placeholder="密码："><br>
        <input type="email" name="email" v-model="user.email" placeholder="邮箱："><br>
        <input type="text" name="phone" v-model="user.phone" placeholder="手机号："><br>
        <div class="gender">
          性别：<input type="radio" name="gender" value="0" v-model="user.gender" checked>男
          <input type="radio" name="gender" value="1" v-model="user.gender">女
          <input type="radio" name="gender" value="2" v-model="user.gender">未知
        </div>
        <button @click="send">注册</button><br>
        <div class="ipt-checkbox"><input type="checkbox" checked><span>保持注册</span></div>
        <div class="skip">
          <router-link to="/login">返回</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { // 用户数据模型
        username: '',
        password: '',
        phone: '',
        email: '',
        gender: '0'
      }
    }
  },
  methods: {
    async send() {
      const { data } = await this.$http.post('/api/register', this.user)
      if (data.status !== 200) return alert(data.message)
      await this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .register-view{
    width: 100%;
    height: 100vh;
    background-image: url(@/assets/images/bg.png);
  }
  .register{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    height: 450px;
    background-color: rgba(255,255,255, 0.6);
    padding: 30px;
    border-radius: 20px;
    .register-title{
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: #000;
      margin-bottom: 20px;
    }
    .reg-form{
      margin-top: 10px;
      text-align: center;
      [type=text],[type=password],[type=email]{
        margin: 10px 0 10px 0;
        padding: 10px;
        width: 250px;
      }
      .gender{
        position: absolute;
        left: 78px;
      }
      button{
        margin: 30px 0 10px 0;
        width: 250px;
        padding: 10px 10px;
        background-color: #1890FF;
        color: white;
      }
      .ipt-checkbox{
        position: absolute;
        left: 74px;
        height: 40px;
        line-height: 40px;
        span{
          padding: 0 8px;
        }
      }
    }
    .skip{
      position: absolute;
      right: 76px;
      bottom: 45px;
      font-size: 14px;
      font-weight: 700;
    }
  }
</style>
