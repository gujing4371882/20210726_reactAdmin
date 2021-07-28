import React, { Component } from 'react'
import { Redirect  } from 'react-router-dom'

import {getUser} from '../../utils/memoryUtils'
export default class Admin extends Component {
  render() {

    const user = getUser()
    if(!user._id) {
      // this.props.history.replace('/login')  // 事件回调函数中路由跳转
      return <Redirect to="/login" /> // 自动跳转到指定的路由路径
    }

    return (
      <div>
        Hello, { user.username }
      </div>
    )
  }
}
