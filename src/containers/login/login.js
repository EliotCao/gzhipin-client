import React from 'react'
import {Button, InputItem, List, NavBar, Radio, WhiteSpace, WingBlank} from "antd-mobile";
import Logo from "../../components/logo/logo";
const ListItem = List.Item;

export default class Login extends React.Component {
    state = {
        username : '',  //用户名
        password : '',  //密码
    }
    login = () => {
        console.log('login',this.state);
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
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
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