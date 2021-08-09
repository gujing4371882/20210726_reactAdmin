import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom" 
// Menu
import { Menu } from 'antd';
// Menu.Item => 无
// SubMenu => Menu.Item

// import { AppstoreOutlined,   PieChartOutlined } from '@ant-design/icons';

// 动态icon的使用
import  * as Icon from '@ant-design/icons';

import './index.less'
import Logo from '../../assets/images/logo.png'
import MenuList from '../../config/menuConfig' // 菜单 

const { SubMenu } = Menu;

/**
 * 导航组件
 */
class LefeNav extends Component {

  // 动态menu
  getMenuList = (menuList) => {
    // 当前加载的路由值
    const path = this.props.location.pathname

    return  menuList.map(v => {
      if (!v.children) {
        // antd4中动态创建icon
        // React.createElement()： 根据指定的第一个参数创建一个React元素
        const icon = React.createElement(
          Icon[v.icon],
          {
            style:{ fontSize: '16px'}
          }
        )
        return (
          // 渲染
          <Menu.Item key={v.key} icon={icon}>
            <Link to={v.key}>
              {v.title}
            </Link>
          </Menu.Item>
        )
      } else {

        // find 查找对应的子路由的主菜单key
        let cItem = v.children.find( citem => path.indexOf(citem.key) === 0 )
        if(cItem) {
          this.openKey = v.key
        }

        const icon= React.createElement(
          Icon[v.icon],
          {
            style:{ fontSize: '16px'}
          }
        )
        return (
          <SubMenu key={v.key} title={v.title} icon={icon}> 
            {
              this.getMenuList(v.children)
            }
          </SubMenu>
        )
      }
     })
  } 


  /**
   * 第一次 render() 之后执行一次
   * ajax && 定时器
   * 
   */
  componentDidMount () {

  }
  
  /**
   * 第一次执行 render ()之前
   * 为第一次 render() 做个同步的准备
   */
  componentWillMount () {
    this.menuNodes = this.getMenuList (MenuList)
  }

  render() {
    // 当前请求的路劲
    // const selectKey = this.props.location.pathname
    let selectKey = this.props.location.pathname
    if(selectKey.indexOf('/product') === 0) { // 当前请求的是商品或其子路由界面
      selectKey = '/product' 
    } 

    // 当前选中的submenu展开 
    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-link">
          <img src={Logo} alt="log" />
          <h1>管理平台</h1>
        </Link>
        <Menu  
          // defaultSelectedKeys 总是根据第一次指定的key显示
          // selectedKeys 根据指定的key显示
          selectedKeys={[ selectKey ]} // 默认选中
          defaultOpenKeys={[this.openKey]} // 默认展开
          mode="inline"
          theme="dark" 
        >
          {
            this.menuNodes
          } 
        </Menu>
      </div>
    )
  }
}

/**
 * 向外暴露：使用高阶组件 withRouter 包装非路由组件
 * 新组件 向 LeftNav 传递 3个特别的属性：history、location、match
 * 结果：LeftNav 可以操作路由相关语法
 *  */ 
export default withRouter(LefeNav)

