import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import './assets/styles/style.less'
import { getRoute } from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)

// setTimeout(function() {
let router = getRoute()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// }, 500)
