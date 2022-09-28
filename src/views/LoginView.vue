<template>
  <div class="login-view">
    <span class="x-title"></span>
    <div class="login">
      <div class="login-title"><span>登录小工单</span></div>
      <div class="login-content">
        <div class="form-title">
          <div :class="[isDisplay ? 'color' : '']" @click="isDisplay = true"><h3>手机号登录</h3></div>
          <div :class="[isDisplay ? '' : 'color']" @click="isDisplay = false"><h3>账号登录</h3></div>
        </div>
        <div class="form" ref="form">
          <div v-if="isDisplay">
            <input type="text" name="phone" v-model="phone" placeholder="手机号：">
          </div>
          <div v-else>
            <input type="text" name="username" v-model="phone" placeholder="账号：">
          </div>
          <div>
            <input type="password" name="password" v-model="password" placeholder="密码：">
          </div>
          <div>
            <button @click="send">登录</button>
          </div>
          <div class="ipt-checkbox">
            <input type="checkbox" checked><span>保持登录</span>
          </div>
        </div>
        <div class="skip">
          <router-link to="/register">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      password: '',
      isDisplay: true
    }
  },
  methods: {
    send() {
      let url = '/api/loginphone'
      let user = { phone: this.phone, password: this.password }
      if (!this.isDisplay) {
        url = '/api/login'
        user = { username: this.phone, password: this.password }
      }
      this.$http.post(url, user).then(({ data }) => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-view{
    width: 100%;
    height: 100vh;
    background-image: url(@/assets/bg.png);
    .x-title{
      width: 280px;
      height: 70px;
      position: absolute;
      top: 5px;
      left: -30px;
      transform: scale(.55);
      background: url(@/assets/web-logo.svg) no-repeat
    }
    .login{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 400px;
      height: 350px;
      background-color: rgba(255,255,255, 0.6);
      padding: 30px;
      border-radius: 20px;
      .login-title{
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        color: #000;
        margin-bottom: 20px;
      }
      .form-title{
        display: flex;
        justify-content: space-around;
        div {
          cursor: pointer;
        }
      }
      .form{
        margin-top: 10px;
        text-align: center;
        [type=text],[type=password]{
          margin: 10px 0 10px 0;
          padding: 10px;
          width: 250px;
        }
        button{
          margin: 10px 0 10px 0;
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
      .color{
        color: skyblue;
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
