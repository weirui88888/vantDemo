import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import App from './App.vue'
import _ from "lodash"
import myTool from "@/common/js/myTool"
import "@/icon/iconfont.css"
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)


// 这里设置了当进入二级页面时,根据不同的模块，显示不同的title,因为这个是多个模块对应同一个页面，
// 所以要动态根据传入的参数设置title,其他几个页面的title直接用vue-wechat-title插件，在路由中设置meta标签即可
router.beforeEach((to, from, next) => {
  // /* 路由发生变化修改页面title */
  if (to.path=="/type") {
    document.title = to.query.model
  }
  next()
})

Vue.prototype.$myTool = myTool

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
