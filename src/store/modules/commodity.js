
import { reqGoodslist, reqGoodscount } from '../../util/request'

// 数据-->要往组件渲染的数据，从后台请求回来的
const state = {
    // 列表数据
    list: [],
    // 总数
    total: 0,
    // 一页 的个数
    size: 2,
    // 页数
    page: 1,

}
// 把请求回来的数据赋值为roleList
const mutations = {
    //改变list
    changeRoleList(state, arr) {
        state.list = arr
    },
    // 改变总数
    changeRolecount(state, num) {
        state.total = num
    },
    //改变页码 
    changePage(state, page) {
        state.page = page
    }
}
// 发送请求去后台获取数据
const actions = {
    //请求的列表数据
    reqlist(context) {
        reqGoodslist({ size: context.state.size, page: context.state.page }).then(res => {
            let list = res.data.list ? res.data.list : [];
            //如果人list  为空数组  并且 页数大于1  就  重新 请求前一页
            if (list.length == 0 && context.state.page > 1) {
                // 触发  改变页码的方法
                context.commit("changePage", context.state.page - 1);
                // 从新  请求列表
                context.dispatch("reqlist");
                return
            }
            context.commit('changeRoleList', res.data.list)
        })

    },
    // 请求列表数据的条数
    reqcount(context) {
        reqGoodscount().then(res => {
            context.commit("changeRolecount", res.data.list[0].total)
        })
    },

    // 修改页码
    changePageAction(context, page) {
        // 触发  改变页码的方法
        context.commit("changePage", page)
        // 从新  请求列表
        context.dispatch("reqlist")

    }
}

// 导出数据给组件
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}