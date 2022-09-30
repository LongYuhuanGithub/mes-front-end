<template>
  <div class="register-view" ref="webgl">
    <div class="register">
      <div class="register-title">注册</div>
      <div class="reg-form">
        <div>
          <input type="text" name="username" v-model="user.username" placeholder="用户名">
        </div>
        <div>
          <input type="password" name="password" v-model="user.password" placeholder="密码">
        </div>
        <div>
          <input type="email" name="email" v-model="user.email" placeholder="邮箱">
        </div>
        <div>
          <input type="text" name="phone" v-model="user.phone" placeholder="手机号">
        </div>
        <div class="gender">
          性别：
          <label>
            <input type="radio" name="gender" value="0" v-model="user.gender" checked>男
          </label>
          <label>
            <input type="radio" name="gender" value="1" v-model="user.gender">女
          </label>
          <label>
            <input type="radio" name="gender" value="2" v-model="user.gender">未知
          </label>
        </div>
        <div class="bottom">
          <button @click="send">注册</button>
          <router-link to="/login">
            <button>返回</button>
          </router-link>
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
    // 提交注册
    async send() {
      const { data } = await this.$http.post('/api/register', this.user)
      if (data.status !== 200) return alert(data.message)
      await this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.register-view {
  width: 100%;
  height: 100%;

  .register {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 20px;
    padding: 40px 70px;
    width: 400px;
    height: 420px;
    background-color: rgba(0, 0, 0, 0.6);
    transform: translate(-50%, -50%);

    .register-title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: #eee;
    }

    .reg-form {
      margin-top: 10px;

      [type=text], [type=password], [type=email] {
        border-radius: 5px;
        margin: 10px 0;
        padding: 10px;
        width: 100%;
        transition: all .3s;

        &:focus {
          box-shadow: 0 0 3px 3px #22c78d;
        }
      }

      .gender {
        display: flex;
        color: #eee;

        label {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;

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

    .skip {

    }
  }

  // three.js 渲染的 canvas
  canvas {
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>
