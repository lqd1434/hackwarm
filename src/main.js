import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
