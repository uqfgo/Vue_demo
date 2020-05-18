<template>
  <div>
    <el-button type='info' @click='loginOut'>退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut () {
      // 清空 token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
      // message 提示
      this.$message.success('退出成功')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
