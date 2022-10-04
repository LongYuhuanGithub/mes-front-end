<template>
  <div class="users-view">
    <!-- 头部搜索区域 -->
    <header>
      <div>
        用户名称：<input type="text" v-model="user.username">
      </div>
      <div>
        手机号码：<input type="text" v-model="user.phone">
      </div>
      <div>
        用户状态：
        <select v-model="user.status">
          <option value="0">正常</option>
          <option value="1">停用</option>
          <option value="">所有</option>
        </select>
      </div>
      <div>
        <button><i class="iconfont icon-search"></i>搜索</button>
        <button><i class="iconfont icon-reload"></i>重置</button>
      </div>
    </header>
    <!-- 内容区域 -->
    <section>
      <!-- 按钮 -->
      <div class="btn-box">
        <div class="crud-btn">
          <div>
            <button class="crud-one" @click="userAddShow"><i></i>新增</button>
          </div>
          <div>
            <button class="crud-three"><i></i>删除</button>
          </div>
          <div>
            <button class="crud-four"><i></i>导入</button>
          </div>
          <div>
            <button class="crud-five"><i></i>导出</button>
          </div>
        </div>
        <div class="rests-btn">
          <div>
            <button><i class="iconfont icon-search"></i></button>
          </div>
          <div>
            <button><i class="iconfont icon-sync"></i></button>
          </div>
          <div>
            <button><i class="iconfont icon-database"></i></button>
          </div>
          <div>
            <button><i class="iconfont icon-detail-fill"></i></button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table">
        <table>
          <thead class="table-header">
          <tr>
            <th><input type="checkbox"></th>
            <th>登录名称</th>
            <th>用户名称</th>
            <th>部门</th>
            <th>手机</th>
            <th>备注</th>
            <th>用户状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody class="table-tbody">
          <tr v-for="users in userList" :key="users.id">
            <td><input type="checkbox" :value="users.id"></td>
            <td>{{ users.username }}</td>
            <td>{{ users.username }}</td>
            <td>{{ users.dept }}</td>
            <td>{{ users.phone }}</td>
            <td>{{ users.remark }}</td>
            <td>{{ users.status === '0' ? '正常' : '停用' }}</td>
            <td>{{ users.create_time }}</td>
            <td>
              <button @click="userUpdateShow(users.id)"><i class="iconfont icon-edit-square"></i>编辑</button>
              <button @click="userRemoveShow(users.id)"><i class="iconfont icon-close"></i>删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页导航 -->
      <div class="pagination">
        <p>
          <span>当前页：{{ this.pagination.current }}</span>
          <span>显示条数：{{ this.pagination.size }}</span>
          <span>总条数：{{ this.pagination.total }}</span>
        </p>
      </div>
    </section>

    <!-- 模态框 -->
    <div class="modal-box">
      <!-- 遮罩层 -->
      <div class="mask-layer" style="display:none">
        <UserAddView></UserAddView>
        <UserRemoveView :id="id"></UserRemoveView>
        <UserUpdateView :updatelist="updatelist"></UserUpdateView>
      </div>
    </div>
  </div>
</template>

<script>
import UserAddView from './UsersAddView.vue'
import UserRemoveView from './UserRemoveView.vue'
import UserUpdateView from './UserUpdateView.vue'

export default {
  async created() {
    const { data } = await this.$http.get('/users', { params: this.pagination })
    if (data.status !== 200) return this.$message(data.message)
    this.userList = data.data
  },
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('mes_front_end_userinfo')), // 当前登录的用户信息
      userList: [], // 用户列表
      user: { // 用户数据模型
        id: 0, // ID
        username: '', // 用户名称
        phone: '', // 手机
        status: '0' // 用户状态
      },
      pagination: { // 分页导航
        current: 1, // 当前页数
        size: 10, // 一页显示几条
        total: 100 // 总共多少条数据
      },
      updatelist: [] // 要修改id的用户列表
    }
  },
  methods: {
    // 增加列表显示
    userAddShow() {
      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const useradd = document.querySelector('.user-add')
      mask.style.display = 'block'
      useradd.style.display = 'block'
    },
    // 删除列表显示
    userRemoveShow(id) {
      this.id = id
      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const userremove = document.querySelector('.user-remove')
      mask.style.display = 'block'
      userremove.style.display = 'block'
    },
    // 修改列表显示
    async userUpdateShow(id) {
      // 获取要修改的用户
      const { data } = await this.$http.get('/users/' + id)
      if (data.status !== 200) return this.$message(data.message)
      this.updatelist = data.data

      // 遮罩层
      const mask = document.querySelector('.mask-layer')
      // 用户增加列表
      const userupdate = document.querySelector('.user-update-view')
      mask.style.display = 'block'
      userupdate.style.display = 'block'
    }
  },
  components: {
    UserAddView, // 用户增加模块
    UserRemoveView, // 用户删除模块
    UserUpdateView// 用户修改模块
  }
}
</script>

<style lang="scss" scoped>
// 头部搜索区域
header {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  background-color: white;
  font-size: 16px;
  box-sizing: border-box;

  input,
  select {
    border: 1px solid #ccc;
    margin-right: 15px;
    padding: 5px;
    width: 200px;
    height: 30px;
  }

  button {
    border-radius: 16px;
    padding: 0;
    width: 64px;
    height: 32px;
    color: white;

    &:first-child {
      margin-right: 2px;
      background-color: #1ab394;

      &:hover {
        background-color: #29cba8;
      }
    }

    &:last-child {
      background-color: #f8ac59;

      &:hover {
        background-color: #f1b87a;
      }
    }
  }
}

// 内容区域
section {
  box-sizing: border-box;
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  // 按钮
  .btn-box {
    display: flex;
    justify-self: space-between;
    font-size: 14px;
    margin-bottom: 10px;

    i {
      font-size: 18px;
    }

    .crud-btn {
      display: flex;
      flex: 1;

      button {
        width: 70px;
        height: 40px;
        margin-right: 5px;
        border-radius: 5px;
        color: white;
      }

      // 设置按钮的颜色
      .crud-one {
        background-color: blue;
      }

      .crud-two {
        background-color: rgb(81, 236, 177);
      }

      .crud-three {
        background-color: pink;
      }

      .crud-four {
        background-color: rgb(117, 235, 235);
      }

      .crud-five {
        background-color: orange;
      }

    }

    .rests-btn {
      display: flex;
      flex: 1;
      justify-content: flex-end;

      button {
        width: 50px;
        height: 40px;
        background-color: white;
        border: 1px solid #ccc;
      }
    }
  }

  .table {
    box-sizing: border-box;
    text-align: left;

    .table-header {
      font-size: 16px;

      th {
        padding: 10px 0px 10px 5px;
        background-color: #ccc;

        &:first-child {
          width: 50px;
        }

        &:nth-child(2) {
          width: 120px;
        }

        &:nth-child(3) {
          width: 120px;
        }

        &:nth-child(4) {
          width: 120px;
        }

        &:nth-child(5) {
          width: 150px;
        }

        &:nth-child(6) {
          width: 150px;
        }

        &:nth-child(7) {
          // width: 100px;
        }

        &:nth-child(8) {
          text-align: center;
          width: 250px;
        }

        &:nth-child(9) {
          text-align: center;
          width: 250px;
        }
      }
    }

    .table-tbody {
      font-size: 14px;

      td {
        padding: 10px 0px 10px 5px;

        &:first-child {
          width: 50px;
        }

        &:nth-child(2) {
          width: 120px;
        }

        &:nth-child(3) {
          width: 120px;
        }

        &:nth-child(4) {
          width: 120px;
        }

        &:nth-child(5) {
          width: 150px;
        }

        &:nth-child(6) {
          width: 150px;
        }

        &:nth-child(7) {
          width: 200px;
        }

        &:nth-child(8) {
          text-align: center;
          width: 250px;
        }

        button {
          width: 60px;
          height: 30px;
          margin-right: 5px;
          border-radius: 5px;
          color: white;

          &:first-child {
            background-color: blue;
          }

          &:nth-child(2) {
            background-color: red;
          }

          &:last-child {
            background-color: rgb(27, 231, 27);
          }
        }
      }
    }
  }
}

// 分页导航
.pagination {
  text-align: left;
  font-size: 14px;

  span {
    margin-right: 10px;
  }
}

// 模态框
.modal-box {
  .mask-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(124, 119, 119, 0.6);
  }
}
</style>
