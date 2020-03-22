<template>
  <div>
    <!-- 顶部搜索区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          {{modifyInfo.username}}
          <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色名称" prop="role_name"></el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button @click="showModifyDialog(scope.row)" type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeInfo(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页插件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <!-- 弹出添加对话框 -->
      <el-dialog title="添加信息" :visible.sync="addDialogVisible" width="40%" @close="resetAddForm">
        <el-form :model="addInfo" :rules="addInfoRules" ref="addInfoRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addInfo.username"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 弹出修改对话框-->
      <el-dialog title="修改信息" :visible.sync="modifyDialogVisible" width="40%" @close="resetModifyForm">
        <el-form :model="modifyInfo" label-width="70px" ref="modifyInfoRef">
          <el-form-item label="用户名">
            <el-input v-model="modifyInfo.username"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 列表相关信息
        userList: [],
        currentPage: 1,
        pageSize: 10,
        total: 101,
        // 添加信息对话框开关
        addDialogVisible: false,
        // 修改信息对话框开关
        modifyDialogVisible: false,
        // 添加信息
        addInfo: {
          username: ''
        },
        modifyInfo: {
          username: ''
        },
        // 添加信息校验规则
        addInfoRules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 6,
              message: '用户名长度为3-6个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      // 获取信息列表
      async getUserList() {
        const {
          data: result
        } = await this.$http.get('userList');
        if (result.meta.status != 200) return this.$message.error(result.meta.msg);
        this.userList = result.data.users;
        // console.log(this.userList);
      },
      // 监听pagesize改变的事件
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        console.log(this.pageSize);
      },
      // 监听页码值改变
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage);
      },
      // 重置添加表单，绑定的数据都清除
      resetAddForm() {
        this.$refs.addInfoRef.resetFields();
      },
      resetModifyForm() {
        // 目前是通过作用域插槽直接获取表格中数据，不用重置
        // 如果是从后台获取数据，则此处需要将数据重置
        // this.$refs.modifyInfoRef.resetFields();
      },
      // 显示修改对话框
      showModifyDialog(info) {
        this.modifyInfo.username = info.username;
        this.modifyDialogVisible = true;
      },
      // 删除提示框,点击确定返回字符串confirm，点击取消返回cancel
      async removeInfo(info) {
        const res = await this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // console.log(res);
        if(res !== 'confirm') {
          return this.$message.info('已经取消删除');
        }
        console.log('确认删除了');
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
