/** 
 * 包含应用中所有请求的接口函数 
 * 接口请求函数: 如登录/注册等
 * */
import jsonp from "jsonp"
import axios from "axios"
import ajax from './ajax'

const BASE_ULR = `/api`
const OTHER_URL =`/apc`

export function regLogin (userName, passWord) {  
  return ajax({
    method: 'post',
    url: '/api/login', 
    data: {
      userName,
      passWord
    }
  })
}
export const login_  =  data => axios.post(`${OTHER_URL}/login`, data)

// 登录
export const login  =  data => axios.post(`${BASE_ULR}/login`, data)
// 获取分类
export const reqCategory = params => axios(`${BASE_ULR}/manage/category/list`, params)
// export const reqCategory = params => axios.get(`${BASE_ULR}/manage/category/list`, params)

// 新增分类
export const addCategory = data => axios.post(`${BASE_ULR}/manage/category/add`, data)
// 编辑分类
export const updateCategory = data => axios.post(`${BASE_ULR}/manage/category/update`, data)

// 获取产品
export const getProducts = params => axios.get(`${BASE_ULR}/manage/product/list`, params)
export const getProductsSearch = params => axios.get(`${BASE_ULR}/manage/product/search`, params)
// 新增产品

// 编辑产品
// 获取产品详情
// 上传图片

export const uploadImages_ = data => axios.post(`${BASE_ULR}/manage/img/upload`, data)

// 删除图片 
export const delPictures = (data) => axios.post(`${BASE_ULR}/manage/img/delete`, data)

export function uploadImages (data) {  
  return ajax({
    method: 'post',
    url: '/api/manage/img/upload',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}


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