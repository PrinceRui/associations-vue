<template>
 <div>
   <el-row style="margin-bottom: 10px">
     <el-col :span="4" style="padding-right: 10px">
       <el-input placeholder="学号/工号" v-model="user.num" clearable />
     </el-col>
     <el-col :span="4" style="padding-right: 10px">
       <el-input placeholder="姓名" v-model="user.name" clearable />
     </el-col>
     <el-col :span="8" style="padding-right: 10px">
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
     <el-table-column label="班级/部门">
       <template slot-scope="scope">
         {{ scope.row.office.name }}
       </template>
     </el-table-column>
     <el-table-column
         prop="num"
         label="学号/工号"/>
     <el-table-column
         prop="name"
         label="姓名"/>
     <el-table-column
         prop="email"
         label="邮箱"/>
     <el-table-column
         prop="phone"
         label="电话"/>
     <el-table-column label="用户类型">
       <template slot-scope="scope">
         {{ getDictLabel(scope.row.userType, "user_type") }}
       </template>
     </el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
         <!--<el-link icon="el-icon-view" style="margin-right: 15px">查看</el-link>-->
         <el-link icon="el-icon-edit" style="margin-right: 15px" @click="resetPwd(scope.row)">重置密码</el-link>
         <el-link icon="el-icon-delete" @click="del(scope.row)">删除</el-link>
       </template>
     </el-table-column>
   </el-table>
   <el-dialog :visible.sync="form.dialogVisible" v-loading="form.loading">
     <el-form label-position="right" label-width="80px">
       <el-form-item label="班级/部门">
         <el-select v-model="form.user.office.id" filterable>
           <el-option v-for="item in form.offices" :key="item.id" :label="item.name" :value="item.id"/>
         </el-select>
       </el-form-item>
       <el-form-item label="学号/工号">
         <el-input v-model="form.user.num"/>
       </el-form-item>
       <el-form-item label="名字">
         <el-input v-model="form.user.name"/>
       </el-form-item>
       <el-form-item label="邮箱">
         <el-input v-model="form.user.email"/>
       </el-form-item>
       <el-form-item label="电话">
         <el-input v-model="form.user.phone"/>
       </el-form-item>
       <el-form-item label="用户类型">
         <el-select v-model="form.user.userType">
           <el-option
               v-for="item in getDictList('user_type')"
               :key="item.id"
               :label="item.label"
               :value="item.value"
           />
         </el-select>
       </el-form-item>
       <el-form-item label="">
         默认密码为123456
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
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
      user: {
        num: '',
        name: ''
      },
      form: {
        offices: '',
        dialogVisible: false,
        loading: false,
        user: {
          office: {
            id: '',
            name: ''
          },
          num: '',
          name: '',
          email: '',
          phone : '',
          userType: ''
        }
      }
    }
  },
  methods: {
    /** 分页查询用户列表 */
    findList (user) {
      this.loading = true
      this.jsonRequest(this.$api.sys.user.list, user).then(result => {
        this.list = result
        this.loading = false
      })
    },
    /* 打开增加窗口 */
    openAddDialog(){
      this.findAllOffices();
      this.form.dialogVisible = true;
      this.form.loading = false;
      this.form.user = {office: {id: '', name: ''},
                        num: '',
                        name: '',
                        email: '',
                        phone : '',
                        userType: '',
                        }
    },
    /* 提交增加修改的数据 */
    submitForm(){
      this.form.loading = true;
      this.jsonRequest(this.$api.sys.user.save, this.form.user).then(()=> {
        this.form.dialogVisible = false;
        this.message.success({ message: "新增用户'"+this.form.user.num+this.form.user.name+"'成功", showClose: true })
        this.findList({});
      }).finally(()=> {
        this.form.loading = false;
      })
    },
    /* 删除按钮操作 */
    del(user) {
      this.$confirm("确认删除用户'"+user.num+user.name+"'吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.formRequest(this.$api.sys.user.delete, {id: user.id}).then(()=>{
          this.message.success({ message: "删除用户'"+user.num+user.name+"'成功", showClose: true })
        }).then(() => {
          this.findList({});
        });
      })
    },
    /* 重置密码按钮操作 */
    resetPwd(user) {
      this.$confirm("确认要重置'"+user.num+user.name+"'的密码吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.formRequest(this.$api.sys.user.resetPassword, {id: user.id}).then(()=>{
          this.message.success({ message: "重置'"+user.num+user.name+"'的密码成功", showClose: true })
        });
      }).then(() => {
          this.findList({});
      }).catch(function () {
      });
    },
    /* 筛选 */
    search(){
      this.findList(this.user)
    },
    /* 获取所有菜单 */
    findAllOffices(){
      this.getRequest(this.$api.sys.office.allList).then((res)=>{
        this.form.offices = res;
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
