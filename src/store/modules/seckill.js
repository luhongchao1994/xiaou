
import { reqSecklist } from '../../util/request'

// 数据-->要往组件渲染的数据，从后台请求回来的
const state = {
    // 列表数据
    list: [],
}
// 把请求回来的数据赋值为roleList
const mutations = {
    //改变list
    changeRoleList(state, arr) {
        state.list = arr
    },
   
}
// 发送请求去后台获取数据
const actions = {
    //请求的列表数据
    reqlist(context) {
        reqSecklist().then(res => {
            context.commit('changeRoleList', res.data.list)
        })
    },
}

// 导出数据给组件
const getters = {
    list(state) {
        return state.list
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}