import {combineReducers} from "redux";
import {AUTH_SUCCESS,ERROR_MSG} from "./action-types";

const initUser = {
    username:'',//用户名
    type:'',//用户类型 daShen/laoBan
    msg:'',//错误提示信息
    redirectTo:''//需要自动重定向的路由路径
}

function user(state=initUser,action){
    switch (action.type){
        case AUTH_SUCCESS: //data是user
            return {...action.data,redirectTo: '/'}
        case ERROR_MSG: //data是msg
            return {...state,msg:action.data}
        default:
            return state
    }
}

export default combineReducers({
    user
})
//向外暴露得状态的结构：{user:{}}