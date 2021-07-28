import React, { Component } from 'react'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './index.less'
import {removeSession} from '../../utils/storageUtils'  
import {getUser} from '../../utils/memoryUtils'

export default class Header extends Component {

  // 退出登录
  logout = () => {
    // 确认提示

    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '是否退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () =>{
        // 清除session
        removeSession()
        // 清除内存
        getUser()
        // 跳转
        this.props.history.replace('/Login')
      },
      onCancel: () => {
        // alert('取消')
      }
    });

  }

  render() {
    return (
      <div className="header">
        <div className="header-top">
          欢迎，{getUser().username}
          <a href="javascript:" onClick={ this.logout }>退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">角色管理</div>
          <div className="header-bottom-right">
            2021-07-28 12:12:12
            <img src="https://api.map.baidu.com/images/weather/day/duoyun.png" alert="weather"/>
            <span>多云转晴</span>
          </div>
        </div>
      </div>
    )
  }
}
