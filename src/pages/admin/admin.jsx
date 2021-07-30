import React, { Component } from 'react'
import { Redirect, Switch, Route  } from 'react-router-dom'
import { Layout } from 'antd';

// 非路由组件
import {getUser} from '../../utils/memoryUtils'
import LefeNav from "../../components/left-nav";
import Header from "../../components/header"; 
// 路由组件
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Line from '../charts/line'
import Bar from '../charts/bar'
import Pie from '../charts/pie'

// const 必须在import下面
const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {

    const user = getUser()
    if(!user._id) {
      // this.props.history.replace('/login')  // 事件回调函数中路由跳转
      return <Redirect to="/login" /> // 自动跳转到指定的路由路径
    }

    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LefeNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ background: '#fff', margin: '20px' }}>
            
            <Switch>
              {/* 方式一 */}
              {/* 
                Router
                key => path
                value => component
              */}
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />

              {/* 方式二 */}
              {/* <Route path="/admin/home" component={Home} />
              ......
              <Redirect to="/admin/home" /> */}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>
            推荐使用chrome、Edge、firefox，体验效果更佳
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
