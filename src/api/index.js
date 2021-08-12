/** 
 * 包含应用中所有请求的接口函数 
 * 接口请求函数: 如登录/注册等
 * */
// import jsonp from "jsonp"
// import axios from "axios"
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
export const login_  =  data => ajax(`${OTHER_URL}/login`, data, 'POST')

// 登录
export const login  =  data => ajax(`${BASE_ULR}/login`, data, 'POST')
// 获取分类
export const reqCategory = params => ajax(`${BASE_ULR}/manage/category/list`, params) 

// 新增分类
export const addCategory = data => ajax(`${BASE_ULR}/manage/category/add`, data, 'POST')
// 编辑分类
export const updateCategory = data => ajax(`${BASE_ULR}/manage/category/update`, data, 'POST')

// 获取产品
export const getProducts = ({ pageNum, pageSize})  => ajax(`${BASE_ULR}/manage/product/list`, {
  pageNum,
  pageSize
})
// 获取产品 分页 + 查询条件
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(`${BASE_ULR}/manage/product/search`, {
  pageNum,
  pageSize,
  [searchType]: searchName
}) 
// 新增产品
export const addProduct = data => ajax(`${BASE_ULR}/manage/product/add`, data, 'POST')
// 编辑产品
export const updateProduct = data => ajax(`${BASE_ULR}/manage/product/update`, data, 'POST')
// 产品上下架操作
export const updateStatusProduce = data => ajax(`${BASE_ULR}/manage/product/updateStatus`, data, 'POST')

// 上传图片
export const uploadImages = data => ajax(`${BASE_ULR}/manage/img/upload`, data, 'POST')
// 删除图片 
export const delPictures = (data) => ajax(`${BASE_ULR}/manage/img/delete`, data, 'POST')
 


/* // 发送JSONP请求 - 写法
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
} */