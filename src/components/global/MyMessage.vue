<template>
  <transition appear>
    <div class="my-message" v-if="isShow" :style="colorObj[type]">
      <i class="iconfont icon-check-circle-fill" v-if="type === 'success'"></i>
      <i class="iconfont icon-close-circle-fill" v-else></i>
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => (this.isShow = false), 3000) // 3 秒后删除这个组件
  },
  props: {
    message: { type: String, required: true }, // 消息内容
    type: { default: 'error', type: String } // 消息类型，有 success、error
  },
  data() {
    return {
      colorObj: { // 颜色类型对应的样式对象
        success: {
          border: '0.0520833333333333vw solid #e1f3d8',
          backgroundColor: '#f0f9eb',
          color: '#67c23a'
        },
        error: {
          border: '0.0520833333333333vw solid #fde2e2',
          backgroundColor: '#fef0f0',
          color: '#f56c6c'
        }
      },
      isShow: true
    }
  }
}
</script>

<style lang="scss" scoped>
$vw: 19.2;

.my-message {
  position: fixed;
  left: 50%;
  top: 3%;
  display: flex;
  align-items: center;
  border-radius: (5vw / $vw);
  padding: (10vw / $vw) (20vw / $vw);
  transform: translateX(-50%);
  z-index: 999;

  i {
    margin-right: (5vw / $vw);
  }
}

// Transition 组件的过渡样式
.v-enter-active,
.v-leave-active {
  transition: all .5s;
}

.v-enter,
.v-leave-to {
  top: 0;
  transform: translateX(-50%) translateY(-100%);
}

.v-enter-to,
.v-leave {
  top: 3%;
}
</style>
