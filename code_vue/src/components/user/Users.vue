<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-row :gutter="2">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getUserList'>
            <el-button slot="append" icon="el-icon-search" @click='getUserList'></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type='primary'>添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 渲染部分 -->
    <el-table :data='userList' border stripe>
    <el-table-column type='index' label='#'></el-table-column>
    <el-table-column label='姓名' prop='username'></el-table-column>
    <el-table-column label='邮箱' prop='email'></el-table-column>
    <el-table-column label='角色' prop='role_name'></el-table-column>
    <el-table-column label='电话' prop='mobile'></el-table-column>
    <el-table-column label='状态' prop='mg_state'>
      <template slot-scope="scope">
        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label='操作'>
      <template slot-scope="scope">
        <!-- 修改 -->
        <el-tooltip content="修改" placement="top" :enterable='false'>
          <el-button type="primary" icon="el-icon-edit" size='mini'></el-button>
        </el-tooltip>
        <!-- 删除 -->
        <el-tooltip content="删除" placement="top" :enterable='false'>
          <el-button type="danger" icon="el-icon-delete" size='mini'></el-button>
        </el-tooltip>
        <!-- 分配权限 -->
        <el-tooltip content="分配权限" placement="top" :enterable='false'>
          <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4, 5, 10, 20, 50]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 数据列表
      userList: [],
      // 数据页数
      total: 0
    }
  },
  // 页面渲染之前
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const {data: res} = await this.$http.get('users', {params: this.queryInfo})
      if (res.meta.status !== 200) return this.$message.error('获取数据失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听 switch 开关状态的改变
    async userStateChanged (userInfo) {
      const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('修改失败')
      }
      this.$message.success('修改成功')
    }
  }
}
</script>

<style lang="less" scoped></style>
