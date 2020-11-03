import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 菜单的仓库
import menu  from './modules/menu'
import role  from './modules/role'
import classifi  from './modules/classifi'
import commercial  from './modules/commercial'
import commodity  from './modules/commodity'
import banner  from './modules/banner'
import seckill  from './modules/seckill'


// 根目录下
import { actions } from "./actions"
import { state, mutations, getters } from "./mutations"

export default new Vuex.Store({
    actions,
    state,
    mutations,
    getters,
    modules: {
        menu,
        role,
        classifi,
        commercial,
        commodity,
        banner,
        seckill
    }
})
