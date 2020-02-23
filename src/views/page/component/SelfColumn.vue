<template>
  <div class="title-warpper">
    <div class="title">{{ row.title }}</div>
    <div class="sub-title">{{ row.subTitle }}</div>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['row', 'rowSuppleInfo']
}
</script>
<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: 800;
}
.sub-title {
  font-size: 12px;
}
</style>
