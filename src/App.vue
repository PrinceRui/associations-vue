<template>
  <el-container>
    <el-header style="background: #de4436; padding: 0">
      <Header/>
    </el-header>
    <el-container>
      <el-aside style="height: calc( 100vh - 60px ); border-right: solid 1px #e6e6e6;">
        <el-menu
            style="border-right: solid 0px #e6e6e6;"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            active-text-color="#de4436">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="scroll" style="height: calc( 100vh - 60px );" direction="vertical"><!--
        <div id="scroll" class="scroll app-wrapper" style="background: #f9fbfd">
          <router-view/>
        </div>-->
        <div>
          <el-main style="height: calc( 100vh - 101px );background: #f9fbfd">
            <router-view/>
          </el-main>
          <Footer/>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header: Header,
    Footer: Footer
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
  /*max-height: calc(100vh - 50px);*/
}
</style>
