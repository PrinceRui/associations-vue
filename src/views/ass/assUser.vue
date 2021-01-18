<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-col :span="4" style="padding-right: 10px">
        <el-select v-model="assUser.ass.id" @change="search">
          <el-option v-for="item in assList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-col>
      <el-col :span="20" style="padding-right: 10px">
      </el-col>
    </el-row>
    <el-table
        v-loading="loading"
        :data="list"
        border
        style="width: 100%">
      <el-table-column label="班级/部门">
        <template slot-scope="scope">
          {{ scope.row.user.office.name }}
        </template>
      </el-table-column>
      <el-table-column label="学号">
        <template slot-scope="scope">
          {{ scope.row.user.num }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.user.name }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">
          {{ scope.row.user.电话 }}
        </template>
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="info"
          label="申请信息"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="warning" effect="dark" size="small" v-if="scope.row.status == '0'">{{ getDictLabel(scope.row.status, "ass_user_status") }}</el-tag>
          <el-tag type="success" effect="dark" size="small" v-else>{{ getDictLabel(scope.row.status, "ass_user_status") }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == '0'">
            <el-link icon="el-icon-check" type="primary" @click="agree(scope.row)">同意</el-link>
            &nbsp;&nbsp;
            <el-link icon="el-icon-close" type="warning" @click="refuse(scope.row)">拒绝</el-link>
          </div>
          <el-link v-else icon="el-icon-delete" @click="del(scope.row)" type="danger">移除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 5px">
      <el-pagination
          :page-size="assUser.page.pageSize"
          :total="assUser.page.count"
          :current-page="assUser.page.pageNo"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 30, 50, 100, 500]"
          layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      assList: [],
      assUser: {
        page: {
          pageNo: 1,
          pageSize: 30,
          count: 0,
        },
        ass: {
          id: ''
        }
      },
    }
  },
  methods: {
    /** 分页查询用户列表 */
    findList (ass) {
      this.loading = true
      this.jsonRequest(this.$api.ass.assUser.list, ass).then(result => {
        this.assUser.page = result;
        this.list = result.list;
        this.loading = false
      })
    },
    /* 筛选 */
    search(){
      this.findList(this.assUser)
    },
    handleSizeChange(val) {
      this.assUser.page.pageSize = val;
      this.findList(this.assUser);
    },
    handleCurrentChange(val) {
      this.assUser.page.pageNo = val;
      this.findList(this.assUser);
    },
    agree(assUser){
      this.jsonRequest(this.$api.ass.assUser.agree, assUser).then((res)=>{
        this.findList(this.assUser);
        this.message.success({ message: "同意'"+assUser.user.name+"'加入", showClose: true })
      })
    },
    refuse(assUser){

      this.$prompt('请输入拒绝信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputValue: '抱歉，您不合适。'
      }).then(({ value }) => {
        assUser.remark = value;
        this.jsonRequest(this.$api.ass.assUser.refuse, assUser).then((res)=>{
          this.findList(this.assUser);
          this.message.warning({ message: "拒绝'"+assUser.user.name+"'加入", showClose: true })
        })
      })



    },
    del(assUser){
      this.$confirm("确认移除'"+assUser.user.name+"'吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.jsonRequest(this.$api.ass.assUser.delete, assUser).then(()=>{
          this.message.success({ message: "移除'"+assUser.user.name+"'成功", showClose: true })
        }).then(() => {
          this.findList(this.assUser);
        });
      })
    },
  },
  mounted () {
    this.getRequest(this.$api.ass.ass.masterList).then((res)=>{
      this.assList = res;
      this.assUser.ass.id = res[0].id;
      this.findList(this.assUser);
    })
  }
}
</script>

<style scoped>

</style>
