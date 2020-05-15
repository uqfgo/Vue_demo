<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2b4b6b;
}

.login_box {
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
}

.avatar_box {
  overflow: hidden;
  position: absolute;
  top: -25%;
  left: 36%;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  box-shadow: cornflowerblue 0 0 21px;
  background-color: #fff;
  img {
    position: absolute;
    top: 14px;
    left: 12px;
    width: 80%;
    height: 80%;
    border-radius: 50%;
  }
}
</style>
