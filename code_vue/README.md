# Vue后台管理项目
  * ## 登录需求
    - ### 1. 登录业务流程
      - 1) 在登录页面输入用户名和密码
      - 2) 调用后台接口进行验证
      - 3) 通过验证之后，根据后台的响应状态跳转到项目主页

    - ### 2.登录业务的相关技术点

      - http 是无状态的
      - 通过 cookie 在客户端记录状态
      - 通过 session 在服务器端记录状态
      - 通过 token 方式维持状态(如果存在跨域问题请用这个 token 来维持登录状态)

    - ### 3.登录功能实现

      - 1. 登录页面的布局
           - 通过 Element-ui 组件实现布局
           - ![](.\src\images\1.png)
           - el-form
           - el-form-item
           - el-input
           - el-button
           - 字体图标