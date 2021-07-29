import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './index.less'
import {removeSession} from '../../utils/storageUtils'  
import {getUser} from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import { dateFormat } from '../../utils/dateUtils'
import {reWeather} from '../../api/index'
import LinkButton from "../link-button";

class Header extends Component {
  /**
   * 状态
   * 状态数据变化，才会重新渲染
   */
  state = {
    currentTime: dateFormat (new Date(), 'yyyy-MM-dd hh:mm:ss' )
  }

  /** 退出登录 */
  logout = () => { 
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () =>{ 
        removeSession('login_use') // 清除session 
        getUser() // 清除内存
        this.props.history.replace('/Login')
      },
      onCancel: () => {
        // alert('取消')
      }
    });
  }
  /** 获取菜单名称 */
  getTitle = () => {
    const path = this.props.location.pathname
    let title = ''
    menuList.forEach( item => {
      if(item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find (cItem => cItem.key === path)
        if(cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  // 
  getWeather = async () => {
    const result = await reWeather('合肥')
    console.log(result)
  }

  // 
  componentDidMount () {
    // 启动循环定时器
    setInterval(() => { 
      this.setState ({
        currentTime: dateFormat (new Date(), 'yyyy-MM-dd hh:mm:ss' )
      })
    }, 1000);

    // 获取天气接口
    this.getWeather ()    
  }
  
  render() {
    // 读取
    const { currentTime } = this.state
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          欢迎，{getUser().username}
          {/* 组件的标签体（展示文本 - 退出） 作为标签的children属性传入 */}
          <LinkButton onClick={ this.logout }>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{ title }</div>
          <div className="header-bottom-right">
            <span>{ currentTime }</span>
            <img src="https://api.map.baidu.com/images/weather/day/duoyun.png" alert="weather"/>
            <span>多云转晴</span>
          </div>
        </div>
      </div>
    )
  }
}

// 非路由组件 封装成路由组件 -实现路由组件的方法
export default withRouter (Header)
