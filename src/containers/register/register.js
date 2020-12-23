import React from 'react'
import {NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button} from "antd-mobile";
import Logo from "../../components/logo/logo";
const ListItem = List.Item;

export default class Register extends React.Component {
    state = {
        username : '',  //用户名
        password : '',  //密码
        password2 : '', //确认密码
        type : 'laoBan'       //用户类型，大神/老板
    }
    register = () => {
        console.log('register',this.state);
    }
    handleChange = (name, value) => {
        this.setState({
            [name]:value    //属性名不是name,而是name变量的对应的值
        })
    }
    toLogin = () => {
        this.props.history.replace('/login')
    }
    render() {
        const {type} = this.state;
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
                        <InputItem placeholder='请输入密码' type='password' onChange={value => {this.handleChange('password2',value)}}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'daShen'} onChange={() => this.handleChange('type','daShen')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoBan'} onChange={() => this.handleChange('type','laoBan')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有帐号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}