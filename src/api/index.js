/** 
 * 包含应用中所有请求的接口函数 
 * 接口请求函数: 如登录/注册等
 * */
import jsonp from "jsonp"
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

// 获取分类 两种方式都行 get
export const reqCategory = params => axios('/apc/getCategory', params)
// export const reqCategory = params => axios.get('/apc/getCategory', params)
// 新增
export const addCategory = data => axios.post('/apc/addCategory', data)
export const updateCategory = data => axios.post('/apc/updateCategory', data)




// 发送JSONP请求 - 写法
export const reWeather = (city) => {
  new Promise( (resolve, reject) => { // new Promise 执行器函数 - 执行异步任务
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=JSON&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (error, data) => {
      console.log(data)
      if(!error && data.error === 0) {        
        resolve(data)
      } else {
        reject(error)
      }
    })    
  })  
}