/** 
 * 操作local数据的工具函数
 * 
 */

// localStorage set
export const setLocal = (key, value) => {
  localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
}
// localStorage get
export const getLocal = (key) => {
  let value = localStorage.getItem(key) || '{}'
  return typeof value === 'object' ? JSON.parse(value) : value
}
// localStorage remove
export const removeLocal = (key) => localStorage.removeItem(key) 


// sessionStorage
export const setSession = (key, value) => {
  sessionStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value); 
}
// localStorage get
export const getSession = (key) => {
  let value = sessionStorage.getItem(key) || '{}'
  return typeof JSON.parse(value) === 'object' ? JSON.parse(value) : value 
}
// localStorage remove
export const removeSession = (key) => sessionStorage.removeItem(key) 



