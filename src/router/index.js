import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// 引路由
const login =()=>import("../pages/login/login");
const index =()=>import("../pages/index/index");

// 引二级路由
import indexRouters from "../pages/index/twoRouter/ind"

export default new Router({
  routes: [
    {
      path: '/',
      component: login,
    },
    {
      path: '/index',
      component: index,
      children:[
        {
          path:'',
          redirect:'home'
        },
        ...indexRouters
    ]
    }
  ]
})
