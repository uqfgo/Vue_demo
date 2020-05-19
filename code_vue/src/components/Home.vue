<template>
  <el-container class='home-container'>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollpase ? '68px' : '200px'">
        <!-- 侧边栏开关 -->
        <div class="toggle-button" @click='toggleCollapse'>|||</div>

        <!-- 侧边栏内容 -->
        <el-menu :default-active="activePath" router :collapse-transition='false' :collapse='isCollpase' background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened>
          <!-- 一级菜单 隐式转换 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key='item.id'>
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key='subItem.id' @click='saveNavState("/" + subItem.path)'>
              <template slot="title">
                <i class="iconfont icon-fangkuai"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-container>
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-duoyonghu',
        '103': 'iconfont icon-quanxian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-dingdan',
        '145': 'iconfont icon-shuju'
      },
      // 是否折叠
      isCollpase: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    loginOut () {
      // 清空 token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
      // message 提示
      this.$message.success('退出成功')
    },
    // 获取所有的菜单
    async getMenuList () {
      const {data: res} = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    // 点击按钮，菜单的折叠与展开
    toggleCollapse () {
      this.isCollpase = !this.isCollpase
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
}

.iconfont {
  margin-right: 10px;
}

.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  img {
    height: 40px;
  }
  > div {
    display: flex;
    span {
      color: #fff;
      font-size: 20px;
      margin: 8px 0 0 10px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  line-height: 40px;
  font-size: 10px;
  color: #fff;
  text-align: center;
  background-color: #4a4a4a;
  letter-spacing: .2em;
  cursor: pointer;
}
</style>
