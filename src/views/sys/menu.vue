<template>
  <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%">
    <el-table-column
        prop="id"
        label="id"
        width="180">
    </el-table-column>
    <el-table-column
        prop="path"
        label="path"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="name">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      menu: {
        id: '',
        num: '',
        name: ''
      }
    }
  },
  methods: {
    /** 分页查询用户列表 */
    findList (menu) {
      this.loading = true
      this.formRequest(this.$api.sys.menu.list, menu).then(result => {
        this.list = result
        this.loading = false
      })
    }
  },
  mounted () {
    this.findList(this.menu)
  }
}
</script>

<style scoped>

</style>
