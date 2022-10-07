<template>
  <div class="my-users-add" v-show="isShow">
    <!-- 标题 -->
    <div class="title">
      <h2>添加用户</h2>
    </div>
    <hr/>
    <!-- 内容 -->
    <div class="content">
      <div>
        <label>
          <span>用户名称：</span>
          <input type="text" v-model="user.username">
        </label>
      </div>
      <div>
        <label>
          <span>密码：</span>
          <input type="password" v-model="user.password">
        </label>
      </div>
      <div>
        <label>
          <span>邮箱：</span>
          <input type="email" v-model="user.email">
        </label>
      </div>
      <div>
        <label>
          <span>手机：</span>
          <input type="text" v-model="user.phone">
        </label>
      </div>
      <div>
        <label>
          <span>性别：</span>
          <select v-model="user.gender">
            <option value="0">男</option>
            <option value="1">女</option>
            <option value="2">未知</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <span>备注：</span>
          <input type="text" v-model="user.remark">
        </label>
      </div>
      <div>
        <label>
          <span>角色：</span>
          <label v-for="item in roleList" :key="item.id">
            <input type="checkbox" v-model="user.roleIds" :value="item.id">{{ item.role_name }}
          </label>
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
  data() {
    return {
      isShow: false, // 控制这个组件的显示与隐藏
      roleList: [], // 角色列表
      user: { // 用户数据模型
        username: '', // 用户名称
        password: '', // 密码
        email: '', // 邮箱
        phone: '', // 手机
        gender: '0', // 性别
        create_by: '', // 创建者的用户名
        remark: '', // 备注
        roleIds: [] // 角色ID数组
      }
    }
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { data } = await this.$http.get('/roles')
      if (data.status !== 200) return this.$message(data.message)
      this.roleList = data.data
    },
    // 增加
    async save() {
      this.user.create_by = JSON.parse(sessionStorage.getItem('mes_front_end_userinfo')).username
      const { data } = await this.$http.post('/users', this.user)
      if (data.status !== 200) return this.$message(data.message)
      this.$message(data.message, 'success')
      this.user = {
        username: '',
        password: '',
        email: '',
        phone: '',
        gender: '0',
        create_by: '',
        remark: '',
        roleIds: []
      }
      this.isShow = false
      this.$emit('close-mask', 'success')
    },
    // 返回
    hide() {
      this.user = {
        username: '',
        password: '',
        email: '',
        phone: '',
        gender: '0',
        create_by: '',
        remark: '',
        roleIds: []
      }
      this.isShow = false
      this.$emit('close-mask', 'close')
    }
  }
}
</script>

<style lang="scss" scoped>
$vw: 19.2;

.my-users-add {
  position: absolute;
  top: 50%;
  left: 50%;
  border: (1vw / $vw) solid #ccc;
  border-radius: (10vw / $vw);
  padding: (20vw / $vw);
  width: 30%;
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
      width: 50%;

      &:last-child {
        width: 100%;

        span {
          width: 14%;
        }
      }

      label {
        display: inline-block;
        width: 100%;

        span {
          display: inline-block;
          width: 28%;
          text-align: right;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"],
        select {
          border: (1vw / $vw) solid #ccc;
          width: 72%;
          height: (30vw / $vw);
        }

        select {
          padding: 0;
        }

        label {
          width: auto;
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
