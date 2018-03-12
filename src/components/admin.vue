<template>
  <div class="admin">
    <el-table
    class="table"
    :data="tableData"
    border
    max-height="400">
    <el-table-column
      v-for="(item,index) in columnList"
      :key="index"
      fixed
      :prop="item.prop"
      :label="item.label"
      :width="item.width">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120"
      >
      <template slot-scope="scope">
        <el-button @click="showEdit(scope.$index)" type="text" size="small">
          编辑
        </el-button>
        <el-button @click="Delete(scope.$index)" type="text" size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog title="编辑帐号" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" :placeholder="oldData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off" :placeholder="oldData.password">{{oldData.password}}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="dialogFormVisible = false" plain>取 消</el-button>
        <el-button type="primary" @click="saveChange(showIndex)" plain>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columnList:[
        {
          "prop":"date",
          "label":"日期",
          "width":'150',
        },
        {
          "prop":"name",
          "label":"姓名",
          "width":'120',
        },
        {
          "prop":"pwd",
          "label":"密码",
          "width":'500',
        },
      ],
      tableData: [],
      oldData:{
        'name':'',
        'password':'',
      },
      form: {
        'name':'',
        'password': '',

      },
      dialogFormVisible:false,
      formLabelWidth: '120px',
      showIndex: -1,

    }
  },
  components:{
  },
  // props:["tableData"],
  created () {
    var p = this
    this.$http.get('api/getAccount') // 本地测试加上api前缀 /api/createAccount
    .then(res => {
      console.log("获取列表成功")
      res.body.forEach(ele => {
        let data = {}
        data.date = "2018-3-7"
        data.name = ele.account
        data.pwd = ele.password
        p.tableData.push(data)    
      });
    })
    .catch(rej => {
      console.log("获取列表失败")
      console.log(rej)
    })
  },
  methods: {
    showEdit (index) {
      var p = this
      p.showIndex = index
      p.dialogFormVisible = true
      p.oldData.name = p.tableData[index].name
      p.oldData.password = p.tableData[index].pwd
    },
    Delete (index) {
      var p = this 
      let name = p.tableData[index].name
      this.$http.post('/api/delete',{ // 本地测试加上api前缀 /api/createAccount
        account: name
      })
      .then(res => {
        p.tableData.splice(index,1)
        console.log("删除记录成功")
      })
      .catch(rej => {
        console.log("删除记录失败")
        console.log(rej)
      })
    },
    saveChange (index) {
      var p = this
      let params = {
        account:p.form.name,
        oldAccount:p.oldData.name,
        password:p.form.password,
      }
      
      this.$http.post('/api/update',params) // 本地测试加上api前缀 /api/createAccount
      .then(res => {
        p.tableData[index].name = p.form.name
        p.tableData[index].pwd = p.form.password
        console.log("修改成功")
        p.dialogFormVisible = false
      })
      .catch(rej => {
        console.log(rej)
        console.log("修改失败")
      })
    }
  },
}
</script>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
    outline:none;
    border:0;
  }
  .admin {
    width:100%;
    background:#eee round;
    height:100vh;
    padding-top:50px;
    .table {
      width:60%;
      margin:0 auto;
      height:400px;
    

    }
  }

</style>
