import Vue from 'vue'
import App from './App'
import { Request } from './utils/request'
import apis from './apis'
Vue.config.productionTip = false
Vue.prototype.$request = Request
Vue.prototype.$apis = apis

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
