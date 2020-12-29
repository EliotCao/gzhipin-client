import React from 'react'
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {login} from "../../redux/actions";

import Logo from "../../components/logo/logo";

class Login extends React.Component {
    state = {
        username : '',  //用户名
        password : '',  //密码
    }
    login = () => {
        // console.log('login',this.state);
        this.props.login(this.state)
    }
    handleChange = (name, value) => {
        this.setState({
            [name]:value    //属性名不是name,而是name变量的对应的值
        })
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render() {
        const {msg, redirectTo} = this.props.user;
        //如果有值，需要重定向
        if (redirectTo){
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg?<div className='error-msg'>{msg}</div>:null}
                        <InputItem placeholder='请输入用户名' onChange={value => {this.handleChange('username',value)}}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={value => {this.handleChange('password',value)}}>密&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)