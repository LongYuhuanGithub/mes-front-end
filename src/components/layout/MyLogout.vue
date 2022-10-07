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
$vw: 19.2;

.my-logout{
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
    align-items: center;
    padding: (10vw / $vw);

    i {
      margin-right: (5vw / $vw);
      color: #e6a23c;
      font-size: (20vw / $vw);
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
