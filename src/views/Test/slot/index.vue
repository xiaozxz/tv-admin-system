<template>
  <div class="page test-page">
    <SoltComponent>
      <div slot="header">test</div>

      <template v-slot="props">
        <Number :number="props.number" @add="props.addNumber"></Number>
      </template>
    </SoltComponent>
  </div>
</template>
<script>
import SoltComponent from './component/SoltComponent'
import Number from './component/NumberComponent'
// import { getSource } from '../../api/ajaxToken'
export default {
  name: 'slotTest',
  components: { SoltComponent, Number },
  data() {
    return {}
  },
  mounted() {
    //  console.info(getSource('tt'))
  },
  methods: {}
}
</script>
<style lang="less">
.test-page {
}
</style>
