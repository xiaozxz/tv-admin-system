<template>
  <div>{{ this.position }}</div>
</template>
<script>
export default {
  name: 'SelfTag',
  props: ['value', 'formModel', 'position', 'controlOption']
}
</script>
