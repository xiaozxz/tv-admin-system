<template>
  <div class="slot-component">
    <slot name="header">
      <header>这是标题</header>
    </slot>

    <div class="content">
      <slot :number="number" :addNumber="addNumber"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      number: 0
    }
  },
  methods: {
    addNumber() {
      this.number++
    }
  }
}
</script>
<style lang="less">
.slot-component {
}
</style>
