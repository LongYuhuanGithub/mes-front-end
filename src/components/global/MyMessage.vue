<template>
  <div class="my-message">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: { default: '这是一段消息', type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
.my-message {
  position: fixed;
  left: 50%;
  top: 10%;
  border-radius: 5px;
  padding: 10px;
  transform: translateX(-50%);
  background-color: #d9d9d9;
}
</style>
