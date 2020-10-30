import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 菜单的仓库
import menu  from './modules/menu'
import role  from './modules/role'
import classifi  from './modules/classifi'
import commercial  from './modules/commercial'
import commodity  from './modules/commodity'


export default new Vuex.Store({
    modules: {
        menu,
        role,
        classifi,
        commercial,
        commodity
    }
})
