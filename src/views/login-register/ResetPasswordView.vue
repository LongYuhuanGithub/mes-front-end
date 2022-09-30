<template>
  <div class="reset-password-view" ref="webgl">
    <div class="forgetpwd">
      <div class="forgetpwd-title"><span>重置密码</span></div>
      <div class="forgetpwd-content">
        <div class="form">
          <div>
            <input type="email" name="email" v-model="email" placeholder="邮箱">
          </div>
          <div class="code">
            <input type="text" name="checkCode" v-model="checkCode" placeholder="验证码">
            <button @click="getCode">获取验证码</button>
          </div>
          <div>
            <input type="password" name="newPassword" v-model="newPassword" placeholder="新密码">
          </div>
          <div>
            <input type="password" name="affirmPassword" v-model="affirmPassword" placeholder="确认密码">
          </div>
          <div class="bottom">
            <button @click="commitForm">提交</button>
            <router-link to="/login">
              <button>返回</button>
            </router-link>
          </div>
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
      email: '', // 输入的邮箱
      checkCode: '', // 输入的验证码
      newPassword: '', // 输入的新密码
      affirmPassword: '' // 输入的确认密码
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      const url = '/api/getcheckcode'
      const { data } = await this.$http.post(url, { email: this.email })
      this.checkCode = data.checkCode
    },
    // 提交表单
    async commitForm() {
      const { data } = await this.$http.put('/api/resetpassword', {
        checkCode: this.checkCode,
        newPassword: this.newPassword,
        affirmPassword: this.affirmPassword
      })
      if (data.status !== 200) return alert(data.message)
      await this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-password-view {
  width: 100%;
  height: 100%;

  .forgetpwd {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 20px;
    padding: 40px 70px;
    width: 400px;
    height: 420px;
    background-color: rgba(0, 0, 0, 0.6);
    transform: translate(-50%, -50%);

    .forgetpwd-title {
      margin-bottom: 20px;
      color: #eee;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
    }

    .form {
      margin-top: 10px;
      text-align: center;

      div {
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
      }

      .code {
        input {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          width: 68%;
        }

        button {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          width: 32%;
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;
      }

      button {
        border-radius: 5px;
        margin: 10px 0;
        padding: 10px;
        width: 46%;
        background-color: #1890FF;
        color: white;
        transition: all .5s;

        &:hover {
          background-color: #47a7ff;
        }
      }

      a {
        width: 46%;

        button {
          width: 100%;
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
