/** 
 * axios
 * 封装Ajax请求函数 
 * 2021-07-27
 * */
import axios from  'axios'
import { Message } from 'antd'
import qs from 'qs'

// 请求拦截器
axios.interceptors.request.use( config => {  
  // 请求方式和请求体数据格式
  const { method, data } = config
  if(method.toLowerCase() === 'post' && typeof data === 'object') {
    // x-www-form-urlencoded
    config.data = qs.stringify(data)
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
