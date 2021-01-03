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
          prop="num"
          label="num"
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
  name: 'index',
  data () {
    return {
      loading: false,
      list: [],
      user: {
        id: '',
        num: '',
        name: ''
      }

    }
  },
  methods: {
    /** 分页查询用户列表 */
    findList (user) {
      this.loading = true
      this.formRequest(this.$api.sys.user.list, user).then(result => {
        this.list = result
        this.loading = false
      })
    }
  },
  mounted () {
    this.findList(this.user)
  }
}
</script>

<style scoped>

</style>
