import Vue from 'vue'
import {Button, Form, FormItem, Input, Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 这个弹框提示必须使用原型链
Vue.prototype.$message = Message
