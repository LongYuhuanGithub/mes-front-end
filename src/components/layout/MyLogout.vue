<template>
  <div class="my-logout" v-show="isShow">
    <!-- 标题 -->
    <div class="title">
      <h2>提示</h2>
    </div>
    <hr/>
    <!-- 内容 -->
    <div class="content">
      <i class="iconfont icon-warning-circle-fill"></i>确认要退出吗？
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <button @click="affirm">确认</button>
      <button @click="hide">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false // 控制这个组件的显示与隐藏
    }
  },
  methods: {
    // 删除
    async affirm() {
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
.my-logout{
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 20%;
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
    align-items: center;
    padding: 10px;

    i {
      margin-right: 5px;
      color: #e6a23c;
      font-size: 20px;
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
