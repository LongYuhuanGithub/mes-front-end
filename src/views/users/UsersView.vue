<template>
  <div class="users-view">
    <!-- 面包屑导航 -->
    <div class="card breadcrumb">
      <span @click="jumpTo('/home/welcome')"><a href="javascript:void(0)">首页</a></span>
      <i class="iconfont icon-right"></i>
      <span>系统管理</span>
      <i class="iconfont icon-right"></i>
      <span>用户管理</span>
    </div>

    <!-- 头部搜索区域 -->
    <header class="card">
      <div>
        用户名称：<input type="text" v-model="user.username" @keyup.enter="getUserList">
      </div>
      <div>
        手机号码：<input type="text" v-model="user.phone" @keyup.enter="getUserList">
      </div>
      <div>
        用户状态：
        <select v-model="user.status">
          <option value="">所有</option>
          <option value="0">正常</option>
          <option value="1">停用</option>
        </select>
      </div>
      <div>
        <button @click="getUserList"><i class="iconfont icon-search"></i>搜索</button>
        <button @click="user = { id: 0, username: '', phone: '', status: '' }"><i class="iconfont icon-reload"></i>重置</button>
      </div>
    </header>

    <!-- 内容区域 -->
    <section class="card">
      <!-- 按钮 -->
      <div class="btn-box">
        <div class="left">
          <button @click="showUserAdd"><i class="iconfont icon-plus"></i>新增</button>
          <button @click="removeChecked"><i class="iconfont icon-close"></i>删除</button>
          <button @click="print"><i class="iconfont icon-download"></i>导出</button>
        </div>
        <div class="right">
          <div>
            <button @click="reload"><i class="iconfont icon-sync"></i></button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <table cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <th><input type="checkbox" :checked="isCheckedAll" @change="checkAllChange"></th>
          <th>ID</th>
          <th>用户名称</th>
          <th>部门</th>
          <th>手机</th>
          <th>用户状态</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in userList" :key="item.id">
          <td><input type="checkbox" v-model="checkedUserList" :value="item"></td>
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.dept ? item.dept : '无' }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.status === '0' ? '正常' : '停用' }}</td>
          <td>{{ item.create_time | formatDate }}</td>
          <td>
            <button @click="showUserUpdate(item.id)"><i class="iconfont icon-edit-square"></i>编辑</button>
            <button @click="showUserRemove(item.id)"><i class="iconfont icon-close"></i>删除</button>
            <button @click="resetPassword(item.id, item.username)"><i class="iconfont icon-key"></i>重置密码</button>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页导航 -->
      <div class="pagination">
        <span>总共{{ pagination.total }}条</span>
        <span>
          一页显示
          <select v-model="pagination.size" @change="reload">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          条
        </span>
        <span>当前第{{ pagination.current }}页</span>
        <span>总{{ pagination.pageSize }}页</span>
        <span>
          <button @click="pageTurning(pagination.current - 1)"><i class="iconfont icon-left"></i></button>
        </span>
        <span>
          <button @click="pageTurning(pagination.current + 1)"><i class="iconfont icon-right"></i></button>
        </span>
      </div>
    </section>

    <!-- 遮罩层 -->
    <transition>
      <div class="mask" v-show="isShowMask">
        <MyUsersAdd ref="myUsersAddRef" @close-mask="closeMask"></MyUsersAdd>
        <MyUsersRemove ref="myUsersRemoveRef" :removeIds="removeIds" @close-mask="closeMask"></MyUsersRemove>
        <MyUsersUpdate ref="myUsersUpdateRef" :id="user.id" @close-mask="closeMask"></MyUsersUpdate>
        <MyResetPassword ref="myResetPasswordRef" :id="user.id" :username="user.username" @close-mask="closeMask"></MyResetPassword>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MyUsersAdd from '@/components/users/MyUsersAdd'
import MyUsersRemove from '@/components/users/MyUsersRemove'
import MyUsersUpdate from '@/components/users/MyUsersUpdate'
import MyResetPassword from '@/components/users/MyResetPassword'

export default {
  created() {
    this.getUserList()
  },
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('mes_front_end_userinfo')), // 当前登录的用户信息
      userList: [], // 用户列表
      checkedUserList: [], // 选中的用户列表
      removeIds: [], // 要删除的ID数组
      user: { // 用户数据模型
        id: 0, // ID
        username: '', // 用户名称
        phone: '', // 手机
        status: '' // 用户状态
      },
      pagination: { // 分页导航
        current: 1, // 当前页数
        size: 10, // 一页显示几条
        total: 100, // 总共多少条数据
        pageSize: 10 // 总共多少页
      },
      isShowMask: false, // 控制遮盖层的显示与隐藏
      print: window.print // 打印
    }
  },
  methods: {
    ...mapMutations(['setActiveByPath']),
    // 路由跳转
    jumpTo(url) {
      this.$router.push(url)
      this.setActiveByPath(this.$route.path)
    },
    // 获取用户列表
    async getUserList() {
      const params = { current: this.pagination.current, size: this.pagination.size }
      if (this.user.username) params.username = this.user.username
      if (this.user.phone) params.phone = this.user.phone
      if (this.user.status) params.status = this.user.status
      const { data } = await this.$http.get('/users', { params })
      if (data.status !== 200) return this.$message(data.message)
      this.userList = data.data
      this.pagination.total = data.total
      this.pagination.pageSize = Math.ceil(this.pagination.total / this.pagination.size)
    },
    // 重新加载
    reload() {
      this.checkedUserList = []
      this.getUserList()
    },
    // 全选框状态改变
    checkAllChange(event) {
      if (event.target.checked) this.checkedUserList = [...this.userList]
      else this.checkedUserList = []
    },
    // 删除选中的用户
    removeChecked() {
      this.removeIds = []
      this.checkedUserList.forEach(item => this.removeIds.push(item.id))
      this.isShowMask = true
      this.$refs.myUsersRemoveRef.isShow = true
    },
    // 翻页
    pageTurning(current) {
      if (current < 1 || current > this.pagination.pageSize) return
      this.pagination.current = current
      this.checkedUserList = []
      this.getUserList()
    },
    // 显示增加对话框
    showUserAdd() {
      this.isShowMask = true
      const myUsersAddRef = this.$refs.myUsersAddRef
      myUsersAddRef.getRoleList()
      myUsersAddRef.isShow = true
    },
    // 显示删除对话框
    showUserRemove(id) {
      this.removeIds = [id]
      this.isShowMask = true
      this.$refs.myUsersRemoveRef.isShow = true
    },
    // 显示修改对话框
    showUserUpdate(id) {
      this.user.id = id
      this.$nextTick(async () => {
        this.isShowMask = true
        const myUsersUpdateRef = this.$refs.myUsersUpdateRef
        await myUsersUpdateRef.getUserInfo()
        await myUsersUpdateRef.getRoleList()
        await myUsersUpdateRef.getRoleByUserId()
        myUsersUpdateRef.isShow = true
      })
    },
    // 重置密码
    resetPassword(id, username) {
      this.user.id = id
      this.user.username = username
      this.isShowMask = true
      this.$refs.myResetPasswordRef.isShow = true
    },
    // 关闭遮盖层
    closeMask(type) {
      if (type === 'success') {
        this.isShowMask = false
        this.getUserList()
      } else if (type === 'close') this.isShowMask = false
    }
  },
  computed: {
    // 计算用户是否全部选中
    isCheckedAll() {
      return this.checkedUserList.length === this.userList.length
    }
  },
  components: {
    MyUsersAdd, // 用户增加对话框
    MyUsersRemove, // 用户删除对话框
    MyUsersUpdate, // 用户修改对话框
    MyResetPassword // 重置密码对话框
  }
}
</script>

<style lang="scss" scoped>
$vw: 19.2;

.users-view {
  // 头部搜索区域
  header {
    display: flex;
    align-items: center;
    font-size: (16vw / $vw);

    input,
    select {
      border: (1vw / $vw) solid #ccc;
      margin-right: (15vw / $vw);
      padding: (5vw / $vw);
      width: (200vw / $vw);
      height: (30vw / $vw);
    }

    button {
      border-radius: (16vw / $vw);
      padding: 0;
      width: (64vw / $vw);
      height: (32vw / $vw);
      color: white;

      &:first-child {
        margin-right: (5vw / $vw);
        background-color: #1ab394;

        &:hover,
        &:focus {
          background-color: #29cba8;
        }
      }

      &:last-child {
        background-color: #f8ac59;

        &:hover,
        &:focus {
          background-color: #f1b87a;
        }
      }

      i {
        font-size: (16vw / $vw);
      }
    }
  }

  // 内容区域
  section {
    margin-top: (10vw / $vw);

    // 按钮
    .btn-box {
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;

        button {
          border-radius: (5vw / $vw);
          margin-right: (5vw / $vw);
          color: white;

          &:first-child {
            background-color: #1c84c6;

            &:hover,
            &:focus {
              background-color: #4999cc;
            }
          }

          &:nth-child(2) {
            background-color: #f59da6;

            &:hover,
            &:focus {
              background-color: #f3b0b7;
            }
          }

          &:last-child {
            margin-right: 0;
            background-color: #f8ac59;

            &:hover,
            &:focus {
              background-color: #f5ba79;
            }
          }
        }
      }

      .right {
        div {
          button {
            border: (1vw / $vw) solid #ccc;
            width: (50vw / $vw);
            background-color: white;

            &:hover,
            &:focus {
              background-color: #eee;
            }

            i {
              font-size: (18vw / $vw);
            }
          }
        }
      }
    }

    // 表格
    table {
      margin-top: (10vw / $vw);
      width: 100%;

      thead {
        background-color: #eff3f8;
        font-size: (16vw / $vw);

        th {
          border-bottom: (1vw / $vw) solid #d8d9db;
          padding: (10vw / $vw);

          &:nth-child(1) {
            width: 3%;
          }

          &:nth-child(2) {
            width: 6%;
          }

          &:nth-child(3) {
            width: 15%;
          }

          &:nth-child(4) {
            width: 15%;
          }

          &:nth-child(5) {
            width: 15%;
          }

          &:nth-child(6) {
            width: 6%;
          }

          &:nth-child(7) {
            width: 20%;
          }

          &:nth-child(8) {
            width: 20%;
          }
        }
      }

      tbody {
        text-align: center;

        tr {
          transition: all .5s;

          &:hover {
            background-color: #eee;
          }

          td {
            border-bottom: (1vw / $vw) solid #d8d9db;
            padding: (10vw / $vw);

            &:nth-child(1) {
              width: 3%;
            }

            &:nth-child(2) {
              width: 6%;
            }

            &:nth-child(3) {
              width: 15%;
            }

            &:nth-child(4) {
              width: 15%;
            }

            &:nth-child(5) {
              width: 15%;
            }

            &:nth-child(6) {
              width: 6%;
            }

            &:nth-child(7) {
              width: 20%;
            }

            &:nth-child(8) {
              width: 20%;

              button {
                margin-right: (5vw / $vw);
                padding: (5vw / $vw);
                color: white;

                &:nth-child(1) {
                  background-color: #1580c4;

                  &:hover,
                  &:focus {
                    background-color: #4999cc;
                  }
                }

                &:nth-child(2) {
                  background-color: #ed5565;

                  &:hover,
                  &:focus {
                    background-color: #ee707d;
                  }
                }

                &:nth-child(3) {
                  margin-right: 0;
                  background-color: #23c6c8;

                  &:hover,
                  &:focus {
                    background-color: #29dde0;
                  }
                }
              }
            }
          }
        }
      }
    }

    // 分页导航
    .pagination {
      display: flex;
      align-items: center;
      margin-top: (10vw / $vw);

      span {
        margin-right: (10vw / $vw);

        select {
          border: (1vw / $vw) solid #ccc;
          padding: (5vw / $vw) (10vw / $vw);
        }

        button {
          padding: (5vw / $vw) (7vw / $vw);
          background-color: #909399;
          color: #fff;

          &:hover {
            background-color: #6b6d71;
          }

          i {
            font-size: (18vw / $vw);
          }
        }
      }
    }
  }

  // 遮盖层
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  // Transition 组件的过渡样式
  .v-enter-active,
  .v-leave-active {
    transition: all .3s;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
  }

  .v-enter-to,
  .v-leave {
    opacity: 1;
  }
}
</style>
