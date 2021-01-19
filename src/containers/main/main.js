import React from 'react'
import {Switch,Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()
import {NavBar} from "antd-mobile";

import LaobanInfo from "../laoban-info/laoban-info";
import DashenInfo from "../dashen-info/dashen-info";
import Dashen from "../dashen/dashen";
import Laoban from "../laoban/laoban";
import Message from "../message/message";
import Personal from "../personal/personal";
import NotFound from "../../components/not-found/not-found";
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat";

import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions";

class Main extends React.Component {

    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        //登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if (userid && !_id){
            //发送异步请求，获取user
            // console.log('获取请求user')
            this.props.getUser();
        }
    }

    render() {
        //读取cookie中的userid
        const userid = Cookies.get('userid');
        //如果没有，自动重定向到login
        if (!userid){
            return <Redirect to='/login'/>
        }
        //如果有，读取redux中user状态
        const {user,unReadCount} = this.props;
        //如果user没有id,返回null(不做任何展示)
        if (!user._id){
            return null;
        } else {
            //如果有_id,显示对应的界面
            //根据user的type和header来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname;
            if (path==='/'){
                path = getRedirectTo(user.type,user.header);
                return <Redirect to={path}/>
            }
        }



        /*//检查用户是否登录，如果没有，自动重定向到登录页面
        const {user} = this.props;
        if (!user._id){
            return <Redirect to='/login'/>
        }*/

        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path===path) //得到当前的nav,可能没有

        if(currentNav){
            //判断哪个路由需要隐藏
            if (user.type==='laoBan'){
                navList[1].hide = true;
            }else {
                navList[0].hide = true;
            }
        }
        return (
            <div>
                {currentNav?<NavBar className='sticky-header'>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)