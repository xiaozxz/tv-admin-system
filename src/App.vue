<template>
  <div id="app">
    <div class="system-aside">
      <h5 class="aside-title">目录</h5>
      <Menu :menus="menus"></Menu>
    </div>
    <div class="system-body">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>
<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'App',
  components: { Menu },
  data() {
    return {
      menus: [
        {
          name: '首页',
          icon: 'el-icon-s-home',
          path: '/',
          needReset: true
        },
        {
          name: '表单',
          icon: 'el-icon-edit-outline',
          path: 'form',
          children: [
            {
              path: '/form/normal',
              name: '普通表单'
            },
            {
              path: '/form/element',
              name: '类似element写法'
            }
          ]
        },
        {
          name: '表格',
          icon: 'el-icon-menu',
          path: 'table',
          children: [
            {
              path: '/table/normal',
              name: '普通表格'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less"></style>
