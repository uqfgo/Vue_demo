import Vue from 'vue'
// 这样写会报错：Uncaught TypeError: Cannot read property 'install' of undefined at Function.Vue.use
// import {Button, Form, FormItem, Input} from 'element-ui'
// 要不然就是报：[Vue warn]: Unknown custom element: <el-form> - did you register the component correctly? For recursive components, make sure to provide the "name" option.
// 说明这个 use 没用成功啊，可这怎么不成功呢
// Vue.use({
//   Button,
//   Form,
//   FormItem,
//   Input
// })
// Vue.use([
//   Button,
//   Form,
//   FormItem,
//   Input
// ])
// // 下面这个方法就可以,emmm
import {Button} from 'element-ui'
import {Form, FormItem} from 'element-ui'
import {Input} from 'element-ui'
// 导入弹框提示组件
import {Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 这 个弹框提示必须使用原型链
Vue.prototype.$message = Message
