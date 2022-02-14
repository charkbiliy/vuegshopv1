// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import store from './store'
import {Button} from 'mint-ui'
import 'mint-ui/lib/style.css'

//全局引入mock文件
import "./mock/mockServer"

Vue.component(Button.name,Button)
//Vue.use(Button)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  render: h => h(App),
  router,
  store
})
