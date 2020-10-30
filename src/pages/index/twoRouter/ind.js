
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
  },
  {
    path: 'menu',
    component: menu,
    name:"菜单管理",
  },
  {
    path: 'admin',
    component: admin,
    name:"管理员管理",
  },
  {
    path: 'banner',
    component: banner,
    name:"轮播图管理",
  },
  {
    path: 'classifi',
    component: classifi,
    name:"商品分类",
  },
  {
    path: 'commercial',
    component: commercial,
    name:"商品规格",
  },
  {
    path: 'commodity',
    component: commodity,
    name:"商品管理",
  },
  {
    path: 'member',
    component: member,
    name:"会员管理",
  },
  {
    path: 'seckill',
    component: seckill,
    name:"秒杀活动",
  },
  {
    path: 'home',
    component: home,
  },
  
]
export default  indexRouters