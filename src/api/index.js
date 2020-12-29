import ajax from "./ajax";

//注册
export const reqRegister = (user) => ajax('/register',user,'POST')

//登录
export const reqLogin = ({username,password}) => ajax('/login', {username,password},'POST')

//更新用户接口
export const reqUpdateUser = (user) => ajax('/update', user,'POST')

//获取用户信息
export const reqUser = () => ajax('/user')