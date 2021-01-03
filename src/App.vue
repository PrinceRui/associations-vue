<template>
  <Login v-if="$route.meta.isLogin" />
  <el-container v-else>
    <el-header style="background: #de4436; padding: 0">
      <Header/>
    </el-header>
    <el-container>
      <el-aside style="height: calc( 100vh - 60px ); border-right: solid 1px #e6e6e6;">
        <Menu/>
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
import Menu from "@/components/Menu";
import Login from "@/views/Login";
export default {
  name: "App",
  components: {
    Header: Header,
    Footer: Footer,
    Menu: Menu,
    Login: Login
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
  /*max-height: calc(100vh - 50px);*/
}
</style>
