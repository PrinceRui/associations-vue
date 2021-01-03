<template>
  <el-menu
      style="border-right: solid 0px #e6e6e6;"
      default-active="2"
      class="el-menu-vertical-demo"
      active-text-color="#de4436"
      router>
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <template v-for="(item, index) in this.menu">
      <template v-if="hasChildren(item)">
        <el-submenu :index="String(index)" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            {{ item.name }}
          </template>
          <div class="child-menu" v-for="child in item.childs" :key="child.id">
            <el-menu-item v-if="child.isShow == 1" :index="child.path">
              <i :class="child.icon"></i>
              {{ child.name }}
            </el-menu-item>
          </div>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path" :key="item.id">
          <i :class="item.icon"></i>
          {{ item.name }}
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  methods: {
    hasChildren(menu) {
      let b = false;
      if (menu.childs && menu.childs instanceof Array) {
        menu.childs.forEach(child => {
          if (child.meta.isShow == 1) {
            b = true;
          }
        });
      }
      return b;
    }
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    }
  }
}
</script>

<style scoped>

</style>
