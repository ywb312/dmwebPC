import Vue from "vue"
// 初始化css样式
import './assets/css/reset.css'
// 引入本身文件
import App from './App'
// 引入vue-router 路由模块
import router from "./router"
// 引入vuex 
import store from "./store"

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')