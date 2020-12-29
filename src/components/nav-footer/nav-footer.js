import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";

const Item = TabBar.Item;

//希望在非路由组件中使用路由api?
//withRoute()
class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        let {navList} = this.props
        //过滤hide===true的元素
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname;

        return (
            <TabBar>
                {
                    navList.map((nav,index) => (
                        <Item key={nav.path}
                              title={nav.text}
                              icon={{uri: require(`./images/${nav.icon}.png`)}}
                              selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                              selected={path === nav.path}
                              onPress={() => this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        );
    }
}

export default withRouter(NavFooter);//向外暴露withRoute()包装产生的组件，带有location、history、match等路由属性