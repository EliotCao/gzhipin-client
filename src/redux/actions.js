import {reqRegister, reqLogin, reqUpdateUser, reqUser} from '../api'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from "./action-types";

//授权成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
// const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
//接受用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})

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
            dispatch(receiveUser(result.data))
        }else {// 失败
            dispatch(resetUser(result.data))
        }
    }
}