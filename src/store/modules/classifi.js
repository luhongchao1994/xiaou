
import { reqCatelist } from '../../util/request'

// 数据-->要往组件渲染的数据，从后台请求回来的
const state = {
    list: []
}
// 把请求回来的数据赋值为roleList
const mutations = {
    changeRoleList(state, arr) {
        state.list = arr
    }
}
// 发送请求去后台获取数据
const actions = {
    reqlist(context) {
        reqCatelist({istree:true}).then(res => {
            context.commit('changeRoleList', res.data.list)
        })

    }
}

// 导出数据给组件
const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}