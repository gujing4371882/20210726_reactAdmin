import React, { Component } from 'react'
import { Form, Input, Button, Message } from 'antd';
import './login.less'
import Logo from './images/logo.png' 
import {UserOutlined,LockOutlined} from '@ant-design/icons';

// const Item = Form.Item
export default class Login extends Component {

  handleSubmit = () => {  
    alert(1)
  };
  handleLogin = () => {  
    Message.success('登录')
  };

  render() { 
    return (
      <div className="login">
         <div className="login-header">
           <img src={Logo} alt="logo"/> 
           <h1>React管理系统</h1>
         </div>
         <div className="login-content">
            <h1>用户登录</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <Input
                  prefix={ <UserOutlined style={{ color: 'rgba(0,0,0,.25)'}} />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item> 
                <Input
                  prefix={ <LockOutlined style={{ color: 'rgba(0,0,0,.25)'}} />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>              
                <Button type="primary" htmlType="submit" className="login-form-button"  onClick={this.handleLogin} >
                  登录
                </Button> 
              </Form.Item>
            </Form>
         </div>
      </div>
    )
  }
}
