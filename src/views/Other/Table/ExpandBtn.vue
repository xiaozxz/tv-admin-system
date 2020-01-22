<template>
    <el-button type="text" @click="$emit('changeExpand',model)">详情</el-button>
</template>
<script>
    export default {
        name: 'ExpandBtn',
        props: ['model'],
      
    };
</script>