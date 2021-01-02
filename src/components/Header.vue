<template>
  <el-row>
    <el-col style="width: 300px"><el-image style="height: 40px; margin-top: 10px" fit="scale-down" :src="img" /></el-col>
    <el-col style="width: calc( 100vh - 300px )"><div class="grid-content bg-purple-light"></div></el-col>
  </el-row>

</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      img: require('../assets/logo.png')
    }
  }
}
</script>

<style scoped>

</style>
