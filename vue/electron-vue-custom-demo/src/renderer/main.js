import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import { Container, Main, Row, Col, Input, Button, Loading, Notification, MessageBox } from 'element-ui'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification

let vm = new Vue({
  el: '#app',
  router,
  store,
  render(h) {
    return h(App)
  }
})

window.$vm = vm
