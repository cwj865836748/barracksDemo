import Vue from 'vue'
import { Button, Calendar, Input, Select, Option, Checkbox, Cascader, MessageBox } from 'element-ui'
Vue.use(Button).use(Calendar).use(Input).use(Select).use(Option).use(Checkbox).use(Cascader)
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$message = MessageBox
