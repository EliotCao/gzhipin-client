import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqChatMsgList, reqReadMsg} from '../api'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from "./action-types";

import io from 'socket.io-client'

//授权成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
// const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
//接受用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
//接受用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
//接受消息列表的同步action
const receiveMsgList = ({users,chatMsgs,userid}) => ({type:RECEIVE_MSG_LIST, data:{users,chatMsgs,userid}})
//接收一个消息的同步action
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
// 读取了某个聊天消息的同步action
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})


//注册
export const register = (user) => {
    const {username,password,password2,type} = user;
    //表单前台验证
    if (!username){
        return errorMsg('用户名必须指定!')
    } else if (password !== password2){
        return errorMsg('两次密码要一致!');
    }

    return async dispatch => {
        //发送注册的异步ajax请求
        /*const promise = reqRegister(user);
        promise.then(res => {
            const result = res.data // {code: 0/1, data: user, msg: ''}
        })*/
        //表单数据合法，返回一个发ajax请求的异步action
        const res = await reqRegister({username,password,type});
        const result = res.data;
        if (result.code === 0){//成功
            getMsgList(dispatch,result.data._id);
            //分发授权成功的同步action
            dispatch(authSuccess(result.data));
        }else {//失败
            dispatch(errorMsg(result.msg));
        }
    }
}

//登录
export const login = (user) => {
    const {username,password} = user;
    return async dispatch => {
        //表单前台验证
        if (!username){
            return errorMsg('用户名必须指定!')
        } else if (!password){
            return errorMsg('密码必须指定!')
        }

        const res = await reqLogin(user);
        const result = res.data;
        if (result.code === 0){//成功
            getMsgList(dispatch,result.data._id);
            dispatch(authSuccess(result.data))
        }else {//失败
            dispatch(errorMsg(result.msg))
        }
    }
}

//更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;
        if (result.code===0){ // 更新成功: data
            dispatch(receiveUser(result.data))
        }else { // 更新失败: msg
            dispatch(resetUser(result.data))
        }
    }
}

//获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code===0){// 成功
            getMsgList(dispatch,result.data._id);
            dispatch(receiveUser(result.data))
        }else {// 失败
            dispatch(resetUser(result.data))
        }
    }
}

//获取用户列表异步action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type);
        const result = response.data;
        if (result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}


/*
单例对象
1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
2. 创建对象之后: 保存对象
 */

function initIO(dispatch, userid) {
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if(!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:3001')  // 2. 创建对象之后: 保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端接收服务器发送的消息', chatMsg)
            // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
            // debugger
            if(userid===chatMsg.from || userid===chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })

    }
}

// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0) {
        const {users, chatMsgs} = result.data
        // 分发同步action
        dispatch(receiveMsgList({users, chatMsgs,userid}))
    }
}

// 发送消息的异步action
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log('客户端向服务器发送消息', {from, to, content})
        // 发消息
        io.socket.emit('sendMsg', {from, to, content})
    }
}

// 读取消息的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if(result.code===0) {
            const count = result.data
            dispatch(msgRead({count, from, to}))
        }
    }
}