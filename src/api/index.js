/** 
 * 包含应用中所有请求的接口函数 
 * 接口请求函数: 如登录/注册等
 * */
import axios from "axios"
import ajax from './ajax'

export function regLogin (userName, passWord) {
  // return 将ajax的结构返回
  return ajax({
    method: 'post',
    url: '/api/login',
    data: {
      userName,
      passWord
    }
  })
}

export const login  =  data => axios.post('/apc/login', data)