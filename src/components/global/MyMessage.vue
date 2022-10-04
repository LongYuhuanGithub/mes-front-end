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
          border: '1px solid #e1f3d8',
          backgroundColor: '#f0f9eb',
          color: '#67c23a'
        },
        error: {
          border: '1px solid #fde2e2',
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
.my-message {
  position: fixed;
  left: 50%;
  top: 3%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px 20px;
  transform: translateX(-50%);
  z-index: 999;

  i {
    margin-right: 5px;
  }
}

// Transition 组件的过渡样式
.v-enter-active,
.v-leave-active {
  transition: all .5s;
}

.v-enter,
.v-leave-to {
  top: 0 !important;
  transform: translateX(-50%) translateY(-100%) !important;
}

.v-enter-to,
.v-leave {
  top: 3% !important;
}
</style>
