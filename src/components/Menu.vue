<template>
  <div class="page-menu">
    <el-menu :default-active="$route.path" router :default-openeds="openeds">
      <label v-for="(item, index) in menus" :key="index">
        <el-submenu :index="item.path" v-if="item.children">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, index) in item.children"
            :index="subItem.path"
            :key="index"
          >
            <i :class="subItem.icon"></i>
            <span>{{ subItem.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="!item.children"
          @click="goOtherPage(item)"
          :index="item.path"
        >
          <i v-if="item.icon" :class="item.icon"></i>
          <img class="item-icon icon-img" v-if="item.img" :src="item.img" alt />
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </label>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openeds: ['1']
    }
  },
  methods: {
    goOtherPage(item) {
      let { path } = this.$route
      if (path == item.path && item.needReset) {
        this.$router.push({ path, query: { t: new Date().getTime() } })
      }
    }
  }
}
</script>
<style lang="less">
.page-menu {
  .el-menu {
    background: transparent;
    font-size: 14px;
  }
  .el-menu-item {
    &:hover {
      border-bottom: 1px solid #999;
      background-color: transparent;
    }
  }
  .el-submenu {
    .el-submenu__title {
      &:hover {
        border-bottom: 1px solid #999;
        background-color: transparent;
      }
    }
  }
}
</style>
