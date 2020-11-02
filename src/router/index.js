import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"

Vue.use(Router)


// 引路由
const login = () => import("../pages/login/login");
const index = () => import("../pages/index/index");

// 引二级路由
import indexRouters from "../pages/index/twoRouter/ind"

let router = new Router({
  routes: [
    {
      path: '/',
      component: login,
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        ...indexRouters
      ]
    }
  ]
})

//登录拦截
router.beforeEach((to, from, next) => {
  //1.如果前往的是/login ,next()
  if (to.path === "/") {
    next()
    return;
  }
  //2.如果前往的不是登录，判断是否登陆 ,从vuex|sessionStorage 取值
  let userInfo = store.state.userInfo;
  //如果登录过了，next()
  if (userInfo.username) {
    next()
    return;
  }
  //如果没有登录 ，next("/login")
  next("/")
})
export default router