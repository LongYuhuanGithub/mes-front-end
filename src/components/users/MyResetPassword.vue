<template>
  <div class="my-reset-password" v-show="isShow">
    <!-- 标题 -->
    <div class="title">
      <h2>重置密码</h2>
    </div>
    <hr/>
    <!-- 内容 -->
    <div class="content">
      <div>
        <label>
          <span>当前用户：</span>
          <input type="text" disabled :value="username">
        </label>
      </div>
      <div>
        <label>
          <span>新密码：</span>
          <input type="password" v-model="newPassword">
        </label>
      </div>
      <div>
        <label>
          <span>确认密码：</span>
          <input type="password" v-model="affirmPassword">
        </label>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <button @click="save">保存</button>
      <button @click="hide">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'username'],
  data() {
    return {
      isShow: false, // 控制这个组件的显示与隐藏
      newPassword: '', // 输入的新密码
      affirmPassword: '' // 输入的确认密码
    }
  },
  methods: {
    // 修改
    async save() {
      const { data } = await this.$http.put('/users/resetpassword', {
        id: this.id,
        newPassword: this.newPassword,
        affirmPassword: this.affirmPassword
      })
      if (data.status !== 200) return this.$message(data.message)
      this.$message(data.message, 'success')
      this.isShow = false
      this.$emit('close-mask', 'close')
    },
    // 返回
    hide() {
      this.newPassword = ''
      this.affirmPassword = ''
      this.isShow = false
      this.$emit('close-mask', 'close')
    }
  }
}
</script>

<style lang="scss" scoped>
$vw: 19.2;

.my-reset-password {
  position: absolute;
  top: 50%;
  left: 50%;
  border: (1vw / $vw) solid #ccc;
  border-radius: (10vw / $vw);
  padding: (20vw / $vw);
  width: 20%;
  background-color: white;
  transform: translate(-50%, -50%);

  // 标题
  .title {
    padding: (10vw / $vw);
    font-size: (16vw / $vw);
  }

  // 内容
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: (10vw / $vw);

    div {
      margin-bottom: (10vw / $vw);
      width: 100%;

      label {
        display: inline-block;
        width: 100%;

        span {
          display: inline-block;
          width: 28%;
          text-align: right;
        }

        input {
          border: (1vw / $vw) solid #ccc;
          width: 72%;
          height: (30vw / $vw);
        }
      }
    }
  }

  // 按钮
  .btn {
    width: 100%;

    button {
      float: right;
      width: (80vw / $vw);
      height: (35vw / $vw);
      color: white;

      &:first-child {
        background-color: #409eff;

        &:hover {
          background-color: #79bbff;
        }
      }

      &:last-child {
        border: (1vw / $vw) solid #dcdfe6;
        margin-right: (10vw / $vw);
        background-color: #fff;
        color: #000;

        &:hover {
          border: (1vw / $vw) solid #c6e2ff;
          background-color: #ecf5ff;
          color: #4ea5ff;
        }
      }
    }
  }
}
</style>
