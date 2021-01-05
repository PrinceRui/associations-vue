<template>
  <div>
    <el-button @click="login()">login</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    login(){
      this.$router.push({path:'/'})

    }
  }
}
</script>
