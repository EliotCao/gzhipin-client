import {combineReducers} from "redux";
import {
    AUTH_SUCCESS,
    ERROR_MSG, MSG_READ,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RESET_USER
} from "./action-types";
import {getRedirectTo} from "../utils";

const initUser = {
    username:'',//用户名
    type:'',//用户类型 daShen/laoBan
    msg:'',//错误提示信息
    redirectTo:''//需要自动重定向的路由路径
}

function user(state=initUser,action){
    switch (action.type){
        case AUTH_SUCCESS: //data是user
            const {type,header} = action.data;
            return {...action.data,redirectTo: getRedirectTo(type,header)}
        case ERROR_MSG: //data是msg
            return {...state,msg:action.data}
        case RECEIVE_USER: //data是msg
            return action.data
        case RESET_USER: //data是msg
            return {...initUser,msg:action.data}
        default:
            return state
    }
}

const initUserList = []
function userList(state=initUserList,action){
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
    chatMsgs: [], // 当前用户所有相关msg的数组
    unReadCount: 0 // 总的未读数量
}
function chat(state=initChat,action){
    switch (action.type){
        case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
            const {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG: // data: chatMsg
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:
            const {from, to, count} = action.data
            state.chatMsgs.forEach(msg => {
                if(msg.from===from && msg.to===to && !msg.read) {
                    msg.read = true
                }
            })
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if(msg.from===from && msg.to===to && !msg.read) { // 需要更新
                        return {...msg, read: true}
                    } else {// 不需要
                        return msg
                    }
                }),
                unReadCount: state.unReadCount-count
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})
//向外暴露得状态的结构：{user:{},userList:{}}