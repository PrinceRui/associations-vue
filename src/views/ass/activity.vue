<template>
 <div>
   <el-row style="margin-bottom: 10px">
     <el-col :span="4" style="padding-right: 10px">
       <el-input placeholder="姓名" v-model="activity.name" clearable />
     </el-col>
     <el-col :span="12" style="padding-right: 10px">
       <el-button round icon="el-icon-search" @click="search">搜索</el-button>
     </el-col>
     <el-col :span="8" style="text-align: right">
       <el-button icon="el-icon-plus" @click="openAddDialog">增加</el-button>
     </el-col>
   </el-row>
   <el-table
       v-loading="loading"
       :data="list"
       border
       style="width: 100%">
     <el-table-column
         prop="name"
         label="名称"/>
     <el-table-column label="举办社团">
       <template slot-scope="scope">
         {{ scope.row.ass.name }}
       </template>
     </el-table-column>
     <el-table-column
         prop="startTime"
         label="发布时间"/>
     <el-table-column
         prop="endTime"
         label="截止报名时间"/>
     <el-table-column label="审核状态">
       <template slot-scope="scope">
         {{ getDictLabel(scope.row.status, "activity_status") }}
       </template>
     </el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <el-link icon="el-icon-edit" style="margin-right: 15px" @click="edit(scope.row)">编辑</el-link>
         <el-link icon="el-icon-delete" @click="del(scope.row)">删除</el-link>
       </template>
     </el-table-column>
   </el-table>
   <div style="margin: 5px">
     <el-pagination
         :page-size="activity.page.pageSize"
         :total="activity.page.count"
         :current-page="activity.page.pageNo"
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :page-sizes="[10, 30, 50, 100, 500]"
         layout="total, sizes, prev, pager, next, jumper"
     >
     </el-pagination>
   </div>
   <el-dialog :visible.sync="form.dialogVisible" v-loading="form.loading">
     <el-form label-position="right" label-width="120px">
       <el-form-item label="名称">
         <el-input v-model="form.activity.name"/>
       </el-form-item>

       <el-form-item label="负责社团">
         <el-select v-model="form.activity.ass.id" placeholder="请选择" filterable>
           <el-option
               v-for="item in form.asss"
               :key="item.id"
               :label="item.name"
               :value="item.id">
           </el-option>
         </el-select>
       </el-form-item>

       <el-form-item label="内容">
         <el-input v-model="form.activity.content"/>
       </el-form-item>
       <el-form-item label="发布时间">
         <el-input v-model="form.activity.startTime"/>
       </el-form-item>
       <el-form-item label="截止报名时间">
         <el-input v-model="form.activity.endTime"/>
       </el-form-item>
       <el-form-item label="审核状态">
         <el-select v-model="form.activity.status">
           <el-option
               v-for="item in getDictList('activity_status')"
               :key="item.id"
               :label="item.label"
               :value="item.value"
           />
         </el-select>
       </el-form-item>
     </el-form>
     <div slot="footer" clactivity="dialog-footer">
       <el-button @click="form.dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="submitForm">确 定</el-button>
     </div>
   </el-dialog>
 </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      activity: {
        page: {
          pageNo: 1,
          pageSize: 30,
          count: 0,
        },
        name: ''
      },
      form: {
        asss: '',
        dialogVisible: false,
        loading: false,
        activity: {
          ass: {
            id: '',
            name: ''
          },
          name: '',
          content: '',
          startTime: '',
          status: '',
          endTime: ''
        }
      }
    }
  },
  methods: {
    /** 分页查询用户列表 */
    findList (activity) {
      this.loading = true
      this.jsonRequest(this.$api.ass.activity.list, activity).then(result => {
        console.log(result)
        this.activity.page = result;
        this.list = result.list;
        this.loading = false
      })
    },
    /* 打开增加窗口 */
    openAddDialog(){
      this.getAllAss();
      this.form.dialogVisible = true;
      this.form.loading = false;
      this.form.activity = {
                              ass: {
                                id: '',
                                name: ''
                              },
                              name: '',
                              content: '',
                              startTime: '',
                              status: '',
                              endTime: ''
                            }
    },
    /* 提交增加修改的数据 */
    submitForm(){
      this.form.loading = true;
      this.jsonRequest(this.$api.ass.activity.save, this.form.activity).then(()=> {
        this.form.dialogVisible = false;
        this.message.success({ message: "保存活动'"+this.form.activity.name+"'成功", showClose: true })
        this.findList({});
      }).finally(()=> {
        this.form.loading = false;
      })
    },
    /* 删除按钮操作 */
    del(activity) {
      this.$confirm("确认删除活动'"+activity.name+"'吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.formRequest(this.$api.ass.activity.delete, {id: activity.id}).then(()=>{
          this.message.success({ message: "删除活动'"+activity.name+"'成功", showClose: true })
        }).then(() => {
          this.findList({});
        });
      })
    },
    /* 编辑按钮操作 */
    edit(activity) {
      this.form.activity = JSON.parse(JSON.stringify(activity));
      this.form.dialogVisible = true;
      this.form.loading = false;
    },
    /* 筛选 */
    search(){
      this.findList(this.activity)
    },
    handleSizeChange(val) {
      this.activity.page.pageSize = val;
      this.findList(this.activity);
    },
    handleCurrentChange(val) {
      this.activity.page.pageNo = val;
      this.findList(this.activity);
    },
    /* 获取所有社团 */
    getAllAss(){
      this.getRequest(this.$api.ass.ass.allList).then((res)=>{
        this.form.asss = res;
        console.log(res)
      })
    },
  },
  mounted () {
    this.findList({})
  }
}
</script>

<style scoped>

</style>
