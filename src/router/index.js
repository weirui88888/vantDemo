import Vue from 'vue';
import Router from 'vue-router';
import commonProblem from "@/components/commonProblem"
import searchProblem from "@/components/searchProblem"
import detailProblem from "@/components/detailProblem"
import typeProblem from "@/components/typeProblem"
Vue.use(Router);

export const constantRouterMap = [
    { path: '/index', component: commonProblem,name:"commonPage",meta: {
        title:'常见问题'
      }},
    { path: '/search',component: searchProblem,name:"searchPage",meta: {
        title:'快速搜索'
      }},
    { path: '/detail',component: detailProblem,name:"detailPage",meta: {
        title:'解决方案'
      }},
    { path: '/type',component: typeProblem,name:"typePage"}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })