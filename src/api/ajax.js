/** 
 * axios
 * 封装Ajax请求函数 
 * 2021-07-27
 * */
/* import axios from  'axios'
import { Message } from 'antd'
import qs from 'qs'

// 请求拦截器
axios.interceptors.request.use( config => {  
  // 请求方式和请求体数据格式
  const { method, data } = config
  if(method.toLowerCase() === 'post' && typeof data === 'object') { 
    config.data = qs.stringify(data)
  } else {
    config.params = data
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use (response => { 
  // 获取成功的结果 data对象   
  const { data, status, msg } = response.data
  // 业务逻辑统一判断
  if(status !== 0) {
    Message.warning(msg)
  }
  return data
}, err => {
  // return Promise.reject(err)
  Message.error (err.message)

  // 返回 pending 状态的 promise
  return new Promise( () => {

  })
})


export default axios
 */


/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化1: 统一处理请求异常?
    在外层包一个自己创建的promise对象
    在请求出错时, 不reject(error), 而是显示错误提示
2. 优化2: 异步得到不是reponse, 而是response.data
   在请求成功resolve时: resolve(response.data)
 */

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if(type==='GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }    
    promise.then(response => { 
      const data = response?.data 
      resolve(data)    
    }).catch(error => {
      message.error('请求出错了: ' + error.message)
    })
  }) 
}
   
   // 请求登陆接口
   // ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
   // 添加用户
   // ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()
   