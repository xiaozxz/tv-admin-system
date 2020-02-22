<template>
  <div class="number-component">
    <div>{{ number }}</div>
    <el-button @click="$emit('add')">测试组件</el-button>
  </div>
</template>
<script>
export default {
  name: 'number',
  props: ['number']
}
</script>
<style lang="less">
.number-component {
}
</style>
