<template>
  <div class="my-users-update" v-show="isShow">
    <!-- 标题 -->
    <div class="title">
      <h2>编辑用户</h2>
    </div>
    <hr/>
    <!-- 内容 -->
    <div class="content">
      <div>
        <label>
          <span>用户名称：</span>
          <input type="text" v-model="user.username" disabled>
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
          <span>状态：</span>
          <select v-model="user.status">
            <option value="0">正常</option>
            <option value="1">停用</option>
          </select>
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
  props: ['id'],
  data() {
    return {
      isShow: false, // 控制这个组件的显示与隐藏
      roleList: [], // 角色列表
      user: { // 用户数据模型
        username: '', // 用户名称
        email: '', // 邮箱
        phone: '', // 手机
        gender: '0', // 性别
        status: '0', // 状态
        remark: '', // 备注
        roleIds: [] // 角色ID数组
      }
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const { data } = await this.$http.get('/users/' + this.id)
      if (data.status !== 200) return this.$message(data.message)
      this.user.username = data.data.username
      this.user.email = data.data.email
      this.user.phone = data.data.phone
      this.user.gender = data.data.gender
      this.user.status = data.data.status
      this.user.remark = data.data.remark
      this.user.roleIds = []
    },
    // 获取角色列表
    async getRoleList() {
      const { data: data2 } = await this.$http.get('/roles')
      if (data2.status !== 200) return this.$message(data2.message)
      this.roleList = data2.data
    },
    // 按照用户ID获取角色列表
    async getRoleByUserId() {
      const { data: data3 } = await this.$http.get('/roles/getrolelistbyuserid/' + this.id)
      if (data3.status !== 200) return this.$message(data3.message)
      data3.data.forEach(item => this.user.roleIds.push(item.id))
    },
    // 修改
    async save() {
      const { data } = await this.$http.put('/users', { id: this.id, ...this.user })
      if (data.status !== 200) return this.$message(data.message)
      this.$message(data.message, 'success')
      this.isShow = false
      this.$emit('close-mask', 'success')
    },
    // 返回
    hide() {
      this.isShow = false
      this.$emit('close-mask', 'close')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-users-update {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  background-color: white;
  transform: translate(-50%, -50%);

  // 标题
  .title {
    padding: 10px;
    font-size: 16px;
  }

  // 内容
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;

    div {
      margin-bottom: 10px;
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
          border: 1px solid #ccc;
          width: 72%;
          height: 30px;
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
      width: 80px;
      height: 35px;
      color: white;

      &:first-child {
        background-color: #409eff;

        &:hover {
          background-color: #79bbff;
        }
      }

      &:last-child {
        border: 1px solid #dcdfe6;
        margin-right: 10px;
        background-color: #fff;
        color: #000;

        &:hover {
          border: 1px solid #c6e2ff;
          background-color: #ecf5ff;
          color: #4ea5ff;
        }
      }
    }
  }
}
</style>
