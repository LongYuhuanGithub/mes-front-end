<template>
  <div class="login-view" ref="webgl">
    <!-- 登录表单盒子 -->
    <div class="login">
      <div class="login-title"><span>登录</span></div>
      <div class="login-content">
        <div class="form-title">
          <div :class="[isDisplay ? 'color' : '']" @click="login">账号登录</div>
          <div :class="[isDisplay ? '' : 'color']" @click="phoneLogin">手机登录</div>
        </div>
        <div class="form" ref="form">
          <div v-if="isDisplay">
            <input type="text" name="username" v-model="value" placeholder="用户名">
          </div>
          <div v-else>
            <input type="text" name="phone" v-model="value" placeholder="手机号">
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
      value: 'admin', // 输入的用户名或电话号
      password: '123456', // 输入的密码
      isDisplay: true // 控制账号登录和手机登录的高亮显示，true 表示账号登录
    }
  },
  methods: {
    // 点击账号登录
    login() {
      this.value = ''
      this.password = ''
      this.isDisplay = true
    },
    // 点击手机登录
    phoneLogin() {
      this.value = ''
      this.password = ''
      this.isDisplay = false
    },
    // 提交登录表单
    async send() {
      // 账号登录
      let url = '/api/login'
      let user = {
        username: this.value,
        password: this.password
      }

      // 手机登录
      if (!this.isDisplay) {
        url = '/api/loginphone'
        user = {
          phone: this.value,
          password: this.password
        }
      }

      // 登录
      const { data } = await this.$http.post(url, user)
      if (data.status !== 200) return this.$message('登录失败')
      sessionStorage.setItem('mes_front_end_token', data.token)
      sessionStorage.setItem('mes_front_end_userinfo', JSON.stringify(data.data))
      this.$message('登录成功', 'success')
      await this.$router.push('/home/welcome')
    }
  }
}
</script>

<style lang="scss" scoped>
$vw: 19.2;

.login-view {
  width: 100%;
  height: 100%;

  // 登录表单盒子
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: (20vw / $vw);
    padding: (40vw / $vw) (70vw / $vw);
    width: (400vw / $vw);
    height: (350vw / $vw);
    background-color: rgba(0, 0, 0, 0.6);
    transform: translate(-50%, -50%);

    .login-title {
      margin-bottom: (20vw / $vw);
      color: #eee;
      text-align: center;
      font-size: (24vw / $vw);
      font-weight: 700;
    }

    .login-content {
      .form-title {
        display: flex;
        justify-content: space-around;

        div {
          color: #a8a8a8;
          font-size: (13vw / $vw);
          font-weight: bold;
          cursor: pointer;

          &.color {
            color: #eee;
          }
        }
      }

      .form {
        margin-top: (10vw / $vw);
        text-align: center;

        input {
          margin: (10vw / $vw) 0;
        }

        button {
          margin: (10vw / $vw) 0;
          width: 100%;
          background-color: #1890FF;
          color: white;

          &:hover {
            background-color: #47a7ff;
          }
        }
      }

      .form-bottom {
        display: flex;
        justify-content: space-between;
        font-size: (14vw / $vw);
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
