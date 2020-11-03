import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from "../store"
import router from "../router"


// 前端每一个请求,除了登录之外，都需要携带一个headers.authorization ,值是用户登录成功的token
//请求拦截
axios.interceptors.request.use(req => {
    //如果请求的地址不是登录，就配置请求头
    if (req.url !== baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req;
})
// 请求拦截
axios.interceptors.response.use((res) => {
    console.log("==========拦截开始===========");
    console.log(res);
    //判断是否登录过期  msg="登录已过期或访问权限受限"
    if (res.data.msg === "登录已过期或访问权限受限") {
        router.push('/login')
        //用户信息置空
        store.dispatch("changeUserInfoAction", {})
    }
    if (res.data.list != null) {
        return res
    } else {
        res.data.list = []
        return res
    }
})
// 定义主头
const baseUrl = '/api'
// 定义图片的头部
Vue.prototype.$imgURL = "http://localhost:3000"

// 菜单列表
// {istree:true}
export const reqMenuList = (params) => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params: params
    })
}

// 菜单添加
export const reqMenuAdd = (from) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(from)
    })
}

// 菜单删除
export const reqMenuDel = (params) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: qs.stringify(params)
    })
}

// 获取一条数据
export const reqMenuListOne = (params) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: params
    })
}

// 修改菜单
export const reqMenuUpate = (params) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(params)
    })
}

// 角色
// 角色添加
export const reqRoleAdd = (form) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(form)
    })
}

// 角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get',
    })
}

// 获取一条角色数据
export const reqRoleListOne = (params) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'get',
        params: params
    })
}

// 角色删除
export const reqRoleDel = (params) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: qs.stringify(params)
    })
}

// 角色修改
export const reqRoleUpate = (params) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: qs.stringify(params)
    })
}

// 会员列表
export const reqMemberlist = () => {
    return axios({
        url: baseUrl + '/api/memberlist',
        method: 'get',

    })
}

// 获取一条会员数据
export const reqMemberinfo = (params) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        method: 'get',
        params: params
    })
}

// 会员修改
export const reqMemberedit = (params) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: qs.stringify(params)
    })
}
// 管理员添加
export const reqUserAdd = (from) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(from)
    })
}
// 管理员总数
export const reqUsercount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}
// 管理员列表
export const reqUserlist = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params,
    })
}
// 管理员获取一条数据
export const reqUserinfo = (params) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: params,
    })
}
// 管理员修改
export const reqUserdit = (form) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(form),
    })
}
// 管理员删除
export const reqUserdelete = (params) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params),
    })
}

// 商品分类 获取全部列表   
export const reqCatelist = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}
// 商品添加   有文件的
export const reqCateadd = (params) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: params
    })
}
// 商品分类获取（一条）
export const reqCateinfo = (params) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: params
    })
}
// 商品分类修改 有文件
export const reqCateedit = (params) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: params
    })
}
// 商品删除
export const reqCatedelete = (params) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: params
    })
}

// 商品 规格===============================================================================

// 添加
export const reqSpecsAdd = (from) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(from)
    })
}
// 总数
export const reqSpecscount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}
// 列表
export const reqSpecslist = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params,
    })
}
// 获取一条数据
export const reqSpecsinfo = (params) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: params,
    })
}
// 修改
export const reqSpecsdit = (form) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(form),
    })
}
// 删除
export const reqSpecsdelete = (params) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(params),
    })
}

//商品管理

// 添加
export const reqGoodsAdd = (from) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: from
    })
}
// 总数
export const reqGoodscount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}
// 列表
export const reqGoodslist = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params,
    })
}
// 获取一条数据
export const reqGoodsinfo = (params) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: params,
    })
}
// 修改
export const reqGoodsdit = (form) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: form,
    })
}
// 删除
export const reqGoodsdelete = (params) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params),
    })
}

//登录
export const reqLogin = (form) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(form)
    })
}


// 轮播图

// 轮播图分类 获取全部列表   
export const reqBannerlist = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}
// 轮播图添加   有文件的
export const reqBanneradd = (params) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: params
    })
}
// 轮播图分类获取（一条）
export const reqBannerinfo = (params) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: params
    })
}
// 轮播图分类修改 有文件
export const reqBanneredit = (params) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: params
    })
}
// 轮播图删除
export const reqBannerdelete = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: params
    })
}


// 会员
// 会员分类 获取全部列表   
export const reqSecklist = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}
// 会员添加   有文件的
export const reqSeckadd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: params
    })
}
// 会员分类获取（一条）
export const reqSeckinfo = (params) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: params
    })
}
// 会员分类修改 有文件
export const reqSeckedit = (params) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: params
    })
}
// 会员删除
export const reqSeckdelete = (params) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: params
    })
}