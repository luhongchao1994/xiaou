
import {reqMenuList} from "../../util/request"

// 存数据的
const state = {
    list:[]
}
// 同步方法
const mutations={
    changeList(state,arr){
        state.list=arr
    }
    
} 
// 异步方法  放axios请求的
const actions= {
    //获取菜单列表的
    requestMenuList(context){
        reqMenuList({istree:true}).then((res)=>{
            context.commit("changeList",res.data.list)
        })
    }    
}
// 导出数据的
const getters= {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}