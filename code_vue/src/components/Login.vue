<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form :model='loginForm' :rules='loginFormRules' ref="loginFormRef" label-width="80px" class='login_form'>
        <!-- 帐号 -->
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="loginForm.username" suffix-icon="iconfont icon-mima"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop='password'>
          <el-input type='password' v-model="loginForm.password" suffix-icon="iconfont icon-ziyuan"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" plain @click='login'>登录</el-button>
          <el-button type="info" plain @click='resetLoginForm'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456 '
      },
      // 登录表单校验
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮,重置表单
    resetLoginForm () {
      // 这里的this指向了VueComponent
      this.$refs.loginFormRef.resetFields()
    },
    // 点击验证
    login () {
      this.$refs.loginFormRef.validate(async vaild => {
        // 当请求失败直接返回
        if(!vaild) return
        // 请求成功执行接下来代码
        var {data:res} = await this.$http.post('login', this.loginForm)
        // 当 res.meta.status 不等于200就是失败
        if(res.meta.status !== 200) {
          this.$message.error('登录失败,用户名或密码错误')
        } else {
          this.$message.success('登录成功')
          /**
           * 登录成功之后的操作：
           *    1.将登录成功之后的 token 保存到客户端的 sessionStorage() 中
           *      1.1.项目中除了登录之外的其他API接口，必须在登录之后才能访问
           *      1.2.token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
           *    2.通过编程式导航跳转到后台主页,路由地址是 /home
           */
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
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

.login_form{
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 20px 0 0;
  box-sizing: border-box;
}
</style>
