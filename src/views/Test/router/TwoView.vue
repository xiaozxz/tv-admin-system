<template>
  <div class="page two-view">
    <router-view name="left"></router-view>
    <router-view name="main"></router-view>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less">
.two-view {
}
</style>
