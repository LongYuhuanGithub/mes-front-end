<template>
  <div class="login-view" ref="webgl">
    <!-- 登录表单盒子 -->
    <div class="login">
      <div class="login-title"><span>登录</span></div>
      <div class="login-content">
        <div class="form-title">
          <div :class="[isDisplay ? '' : 'color']" @click="login">账号登录</div>
          <div :class="[isDisplay ? 'color' : '']" @click="phoneLogin">手机登录</div>
        </div>
        <div class="form" ref="form">
          <div v-if="isDisplay">
            <input type="text" name="phone" v-model="phone" placeholder="手机号">
          </div>
          <div v-else>
            <input type="text" name="username" v-model="phone" placeholder="用户名">
          </div>
          <div>
            <input type="password" name="password" v-model="password" placeholder="密码">
          </div>
          <div>
            <button @click="send">登录</button>
          </div>
        </div>
        <div class="form-bottom">
          <router-link to="/resetPwd">忘记密码</router-link>
          <router-link to="/register">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { renderer } from '@/components/threejs'

export default {
  mounted() {
    this.$refs.webgl.appendChild(renderer.domElement)
  },
  data() {
    return {
      phone: '', // 输入的电话号
      password: '', // 输入的密码
      isDisplay: false // 控制手机登录和账号登录的高亮显示
    }
  },
  methods: {
    // 点击手机登录
    phoneLogin() {
      this.phone = ''
      this.password = ''
      this.isDisplay = true
    },
    // 点击账号登录
    login() {
      this.phone = ''
      this.password = ''
      this.isDisplay = false
    },
    // 提交登录表单
    async send() {
      let url = '/api/loginphone'
      let user = {
        phone: this.phone,
        password: this.password
      }
      if (!this.isDisplay) {
        url = '/api/login'
        user = {
          username: this.phone,
          password: this.password
        }
      }
      const { data } = await this.$http.post(url, user)
      if (data.status !== 200) return alert(data.message)
      sessionStorage.setItem('mes_front_end_token', data.token)
      sessionStorage.setItem('mes_front_end_userinfo', data.data)
      await this.$router.push('/home/welcome')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  width: 100%;
  height: 100%;

  // 登录表单盒子
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 20px;
    padding: 40px 70px;
    width: 400px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.6);
    transform: translate(-50%, -50%);

    .login-title {
      margin-bottom: 20px;
      color: #eee;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
    }

    .login-content {
      .form-title {
        display: flex;
        justify-content: space-around;

        div {
          color: #a8a8a8;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;

          &.color {
            color: #eee;
          }
        }
      }

      .form {
        margin-top: 10px;
        text-align: center;

        input {
          border-radius: 5px;
          margin: 10px 0;
          padding: 10px;
          width: 100%;
          transition: all .3s;

          &:focus {
            box-shadow: 0 0 3px 3px #22c78d;
          }
        }

        button {
          border-radius: 5px;
          margin: 10px 0;
          padding: 10px;
          width: 100%;
          background-color: #1890FF;
          color: white;
          transition: all .5s;

          &:hover {
            background-color: #47a7ff;
          }
        }
      }

      .form-bottom {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 700;

        a {
          color: #a8a8a8;

          &:hover {
            color: #eee;
          }
        }
      }
    }
  }
}

// three.js 渲染的 canvas
canvas {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
