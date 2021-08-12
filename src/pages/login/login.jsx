import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, Message } from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';

import './login.less'
import Logo from '../../assets/images/logo.png' 
import {setSession} from '../../utils/storageUtils'
import {getUser} from '../../utils/memoryUtils'
import {login} from '../../api/index.js'

// const Item = Form.Item
export default class Login extends Component {
  // ref
  formRef = React.createRef();

  handleLogin = () => {   
    const form = this.formRef.current    
    // form 表单验证
    form.validateFields().then( async (values) => { 
      if(values) {
        let res = await login ({username: form.getFieldValue('Username'), password: form.getFieldValue('Password')})      
        Message.success('登录成功!')
        setSession ('login_use',  res) //本地      
        getUser () // 内存
        this.props.history.replace('/') // 主页 
      }      
    }).catch((errInfo)=>{
      Message.error('登录失败!') 
    })
  };

  render() {

    const user = getUser()
    if(user._id) { 
      return <Redirect to="/" />  
    }

    return (
      <div className="login">
        <div className="login-header">
          <img src={Logo} alt="logo"/> 
          <h1>React管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form ref={this.formRef} className="login-form">
            <Form.Item 
              name="Username" 
              rules={
                [
                  { required: true, message: '请输入用户名!' },
                ]
              }
            > 
              <Input
                prefix={ <UserOutlined style={{ color: 'rgba(0,0,0,.25)'}} />}
                placeholder="用户名"
              /> 
            </Form.Item>
            <Form.Item 
                name="Password" 
                rules= {
                  [ 
                    {
                      validator: (_, value) =>{ 
                        if(!value) {
                          return Promise.reject('请输入密码')
                        }
                        if(value.length >= 5 && value.length <= 10) {
                          return Promise.resolve()
                        } else {
                          return Promise.reject('密码长度必须是5~10位')
                        }
                      }
                    }
                  ]
              }
            > 
              <Input
                prefix={ <LockOutlined style={{ color: 'rgba(0,0,0,.25)'}} />}
                type="password"
                placeholder="密码"
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
