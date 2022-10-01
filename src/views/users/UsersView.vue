<template>
  <div class="users-view">
    <!-- 搜索区域 -->
    <div class="nav-bar">
      <div>登录名称：<input type="text"></div>
      <div>手机号码：<input type="text"></div>
      <div>用户状态：
          <select v-model="state" class="state">
            <option value="0">正常</option>
            <option value="1">停用</option>
            <option value="['0','1']">所有</option>
          </select>
      </div>
      <div class="create-time">
        创建时间：<input type="datetime" placeholder=" 开始时间">-<input type="datetime" placeholder=" 结束时间">
      </div>
      <div class="search-reset">
        <button>搜索</button>
        <button>重置</button>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="userlist-content">
      <div class="btn">
        <div class="crud-btn">
          <div><button class="crud-one" @click="userAddShow"><i></i>新增</button></div>
          <div><button class="crud-three"><i></i>删除</button></div>
          <div><button class="crud-four"><i></i>导入</button></div>
          <div><button class="crud-five"><i></i>导出</button></div>
        </div>
        <div class="rests-btn">
          <div><button><i class="iconfont icon-search"></i></button></div>
          <div><button><i class="iconfont icon-sync"></i></button></div>
          <div><button><i class="iconfont icon-database"></i></button></div>
          <div><button><i class="iconfont icon-detail-fill"></i></button></div>
        </div>
      </div>
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
            <tr v-for="users in userslist" :key="users.id">
              <!-- {{users}} -->
              <td><input type="checkbox" :value="users.id"></td>
              <td>{{users.username}}</td>
              <td>{{users.username}}</td>
              <td>{{users.dept}}</td>
              <td>{{users.phone}}</td>
              <td>{{users.remark}}</td>
              <td>{{users.status === '0' ? '正常':'停用'}}</td>
              <td>{{users.create_time}}</td>
              <td>
                <button @click="userUpdateShow(users.id)"><i class="iconfont icon-edit-square"></i>编辑</button>
                <button @click="userRemoveShow(users.id)"><i class="iconfont icon-close"></i>删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <p>
          <span>当前页：{{this.pagination.current}}</span>
          <span>显示条数：{{this.pagination.size}}</span>
          <span>总条数：{{this.pagination.total}}</span>
        </p>
      </div>
    </div>

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
  data() {
    return {
      state: "['0','1']", // 用户状态
      userslist: [], // 获取到的用户列表
      id: 1, // 删除或修改要传过去的数据
      pagination: { // 分页导航
        current: 1, // 当前页数
        size: 10, // 一页显示几条
        total: 100 // 总共多少条数据
      },
      updatelist: []// 要修改id的用户列表
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
      const { data: res } = await this.$http.get('/users/' + id)
      console.log(res)
      if (res.status !== 200) return alert(res.message)
      this.updatelist = res.data

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
  },
  async created() {
    const { data: res } = await this.$http.get('/users', { params: this.pagination })
    if (res.status !== 200) return alert(res.message)
    this.userslist = res.data
    console.log(res.data)
  }
}
</script>

<style lang="scss" scoped>
  // 搜索区域
  .nav-bar{
    box-sizing: border-box;
    background-color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;

    .state{
      width: 80px;
      border: 1px solid #ccc;
      text-align:center;
      margin-bottom: 15px;
    }
    [type=text]{
      width: 250px;
      height: 25px;
      margin-right: 15px;
      margin-bottom: 15px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    [type=datetime]{
      width: 120px;
      height: 25px;
      margin-right: 15px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .search-reset{
      button{
        width: 60px;
        height: 30px;
        border-radius: 15px;
        color: white;
        &:first-child{
          margin-right: 5px;
          background-color: green;
        }
        &:last-child{
          background-color: orange;
        }
      }
    }
  }

  // 内容区域
  .userlist-content{
    box-sizing: border-box;
    background-color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    // 按钮
    .btn{
      display: flex;
      justify-self: space-between;
      font-size: 14px;
      margin-bottom: 10px;
      i{
        font-size: 18px;
      }
      .crud-btn{
        display: flex;
        flex: 1;
        button{
          width: 70px;
          height: 40px;
          margin-right: 5px;
          border-radius: 5px;
          color: white;
        }
        // 设置按钮的颜色
        .crud-one{
          background-color: blue;
        }
        .crud-two{
          background-color: rgb(81, 236, 177);
        }
        .crud-three{
          background-color: pink;
        }
        .crud-four{
          background-color: rgb(117, 235, 235);
        }
        .crud-five{
          background-color: orange;
        }

      }
      .rests-btn{
        display: flex;
        flex:1;
        justify-content: flex-end;
        button{
          width: 50px;
          height: 40px;
          background-color: white;
          border: 1px solid #ccc;
        }
      }
    }

    .table{
      box-sizing: border-box;
      text-align: left;
      .table-header{
        font-size: 16px;
        th{
          padding: 10px 0px 10px 5px;
          background-color: #ccc;
          &:first-child{
            width: 50px;
          }
          &:nth-child(2){
            width: 120px;
          }
          &:nth-child(3){
            width: 120px;
          }
          &:nth-child(4){
            width: 120px;
          }
          &:nth-child(5){
            width: 150px;
          }
          &:nth-child(6){
            width: 150px;
          }
          &:nth-child(7){
            // width: 100px;
          }
          &:nth-child(8){
            text-align: center;
            width: 250px;
          }
          &:nth-child(9){
            text-align: center;
            width: 250px;
          }
        }
      }

      .table-tbody{
        font-size: 14px;
        td{
          padding: 10px 0px 10px 5px;
          &:first-child{
            width: 50px;
          }
          &:nth-child(2){
            width: 120px;
          }
          &:nth-child(3){
            width: 120px;
          }
          &:nth-child(4){
            width: 120px;
          }
          &:nth-child(5){
            width: 150px;
          }
          &:nth-child(6){
            width: 150px;
          }
          &:nth-child(7){
            width: 200px;
          }
          &:nth-child(8){
            text-align: center;
            width: 250px;
          }
          button{
            width: 60px;
            height: 30px;
            margin-right: 5px;
            border-radius: 5px;
            color: white;
            &:first-child{
              background-color: blue;
            }
            &:nth-child(2){
              background-color: red;
            }
            &:last-child{
              background-color: rgb(27, 231, 27);
            }
          }
        }
      }
    }

  }

  // 分页
  .paging{
    text-align: left;
    font-size: 14px;
    span{
      margin-right: 10px;
    }
  }

  // 模态框
  .modal-box{
    .mask-layer{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(124, 119, 119,0.6);
    }
  }

</style>
