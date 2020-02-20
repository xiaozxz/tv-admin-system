<template>
  <div class="home-page">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="home-text">欢迎来到tv-admin-system</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {}
}
</script>
<style lang="less">
.home-page {
  text-align: center;
  padding-top: 220px;
  .home-text {
    font-size: 40px;
    text-transform: uppercase;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
      0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1),
      0 5px 10px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1),
      0 20px 20px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    color: #00a8ff;
  }
}
</style>
