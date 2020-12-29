import React from 'react'
import {connect} from 'react-redux'
import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import {Redirect} from 'react-router-dom'
import HeaderSelector from "../../components/header-selector/header-selector";
import {updateUser} from "../../redux/actions";

class DashenInfo extends React.Component {
    state = {
        header:'',
        post:'',
        info:'',
    }
    //更新header
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    handleChange = (name, value) => {
        this.setState({
            [name]:value
        })
    }
    save = () => {
        this.props.updateUser(this.state);
    }
    render() {
        const {header, type} = this.props.user;
        if (header){//如果信息完善
            const path = type === 'daShen'? '/dahen':'/laoban';
            return <Redirect to={path}/>

        }
        return (
            <div>
                <div>
                    <NavBar>大神信息完善</NavBar>
                    <HeaderSelector setHeader={this.setHeader}/>
                    <InputItem placeholder='请输入求职岗位' onChange={value => {this.handleChange('post', value)}}>求职岗位：</InputItem>
                    <TextareaItem title='职位要求' rows={3} onChange={value => {this.handleChange('info', value)}}/>
                    <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DashenInfo)