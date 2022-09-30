<template>
  <div class="reset-password-view">
    <div class="forgetpwd">
      <div class="forgetpwd-title"><span>重置密码</span></div>
      <div class="forgetpwd-content">
        <div class="form" ref="form">
          <div>
            <input type="email" name="email" v-model="email" placeholder="邮箱：">
          </div>
          <div>
            <input type="text" name="checkCode" v-model="checkCode" placeholder="验证码：">
            <button class="code" @click="getCode">获取验证码</button>
          </div>
          <div>
            <input type="password" name="newPassword" v-model="newPassword" placeholder="新密码：">
          </div>
          <div>
            <input type="password" name="affirmPassword" v-model="affirmPassword" placeholder="确认密码">
          </div>
          <div>
            <button @click="getCommit">提交</button>
            <button>
              <router-link to="/login">返回</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      checkCode: '',
      newPassword: '',
      affirmPassword: ''
    }
  },
  methods: {
    async getCode() {
      const url = '/api/getcheckcode'
      const { data } = await this.$http.post(url, { email: this.email })
      this.checkCode = data.checkCode
    },
    async getCommit() {
      const url = '/api/resetpassword'
      const user = { checkCode: this.checkCode, newPassword: this.newPassword, affirmPassword: this.affirmPassword }
      const { data } = await this.$http.put(url, user)
      if (data.status !== 200) return alert(data.message)
      console.log(data)
      await this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .reset-password-view{
    width: 100%;
    height: 100%;
    background: url(@/assets/images/bg.png) no-repeat center / 100% 100%;
    .forgetpwd{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 400px;
      height: 380px;
      background-color: rgba(255,255,255, 0.6);
      padding: 30px;
      border-radius: 20px;
      .forgetpwd-title{
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        color: #000;
        margin-bottom: 20px;
      }
      .form{
        margin-top: 10px;
        text-align: center;
        [type=password],[type=email]{
          margin: 10px 0 10px 0;
          padding: 10px;
          width: 250px;
        }
        [type=text]{
          margin: 10px 0 10px 0;
          width: 150px;
          padding: 10px 10px;
        }
        .code{
          margin: 10px 0 10px 0;
          width: 100px;
          padding: 10px 10px;
          background-color: #1890FF;
          color: white;
        }
        button{
          margin: 10px 0 10px 0;
          width: 80px;
          padding: 10px 10px;
          background-color: #1890FF;
          color: white;
          &:first-child{
            margin-right: 10px;
          }
          &:last-child a{
            color: white;
          }
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
    }
  }

</style>
