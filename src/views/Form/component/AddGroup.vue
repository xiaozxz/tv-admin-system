<template>
  <div class="add-button">
    <el-button @click="$emit('addRow', {})">新增按钮</el-button>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    addParam() {}
  }
}
</script>
