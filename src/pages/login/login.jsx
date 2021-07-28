import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, Message } from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';

import './login.less'
import Logo from './images/logo.png' 
import {setSession} from '../../utils/storageUtils'
import {getUser} from '../../utils/memoryUtils'

// const Item = Form.Item
export default class Login extends Component {
  // ref
  formRef = React.createRef();

  handleLogin = () => {  
    /** 
     * React将会将会在组件挂载时将DOM元素分配给current属性，并且在组件被卸载时，将current属性重置为null。
     * ref将会在componentDidMount和componentDidUpdate生命周期钩子前被更新
     */
    const form = this.formRef.current    
    // form 表单验证
    form.validateFields().then((values)=>{ 
      Message.success('登录成功!')

      // 模拟默认值
      let user = { _id: '5cd32e23wewe3232221wew', password: '23892437929791123', username: 'admin', create_time: 21981713221, role: { menus: [] } }
      
      // 用户信息保存缓存中 storageUtils
      setSession ('login_use', user)
      // 用户信息保存内存中 memoryUtils
      getUser ()

      // 主页
      this.props.history.replace('/') 
      
    }).catch((errInfo)=>{
      Message.error('登录失败!') 
    })

  };

  render() {  

    const user = getUser() // getSession('login_use')
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
                        if(value.length >= 6 && value.length<=10) {
                          return Promise.resolve()
                        } else {
                          return Promise.reject('密码长度必须是6~10位')
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
