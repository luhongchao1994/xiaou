import Vue from 'vue'
import Router from 'vue-router'
import store from "../../../store/index"
Vue.use(Router)


function checkedRoute(path, next) {
  //如果该用户 menus_url 中有 "/menu"就next();没有，next("/")
  let userInfo = store.state.userInfo;
  if (userInfo.menus_url.includes(path)) {
    next()
  } else {
    next("/index/home")
  }
}
// 引路由  二级路由
const role =()=>import("./role");
const menu =()=>import("./menu");
const admin =()=>import("./admin");
const banner =()=>import("./banner");
const classifi =()=>import("./classifi");
const commercial =()=>import("./commercial");
const commodity =()=>import("./commodity");
const member =()=>import("./member");
const seckill =()=>import("./seckill");
const home =()=>import("./home");




const  indexRouters =[
  {
    path: 'role',
    component: role,
    name:"角色管理",
    beforeEnter(to, from, next) {
      checkedRoute("/role",next)
    }
  },
  {
    path: 'menu',
    component: menu,
    name:"菜单管理",
    beforeEnter(to, from, next) {
      checkedRoute("/menu",next)
    }
  },
  {
    path: 'admin',
    component: admin,
    name:"管理员管理",
    beforeEnter(to, from, next) {
      checkedRoute("/admin",next)
    }
  },
  {
    path: 'banner',
    component: banner,
    name:"轮播图管理",
    beforeEnter(to, from, next) {
      checkedRoute("/banner",next)
    }
  },
  {
    path: 'classifi',
    component: classifi,
    name:"商品分类",
    beforeEnter(to, from, next) {
      checkedRoute("/classifi",next)
    }
  },
  {
    path: 'commercial',
    component: commercial,
    name:"商品规格",
    beforeEnter(to, from, next) {
      checkedRoute("/commercial",next)
    }
  },
  {
    path: 'commodity',
    component: commodity,
    name:"商品管理",
    beforeEnter(to, from, next) {
      checkedRoute("/commodity",next)
    }
  },
  {
    path: 'member',
    component: member,
    name:"会员管理",
    beforeEnter(to, from, next) {
      checkedRoute("/member",next)
    }
  },
  {
    path: 'seckill',
    component: seckill,
    name:"秒杀活动",
    beforeEnter(to, from, next) {
      checkedRoute("/seckill",next)
    }
  },
  {
    path: 'home',
    component: home,
  },
  
]
export default  indexRouters