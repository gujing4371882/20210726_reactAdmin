import { getSession } from './storageUtils'

// 存储登录用户信息 => 后期用redux 取代
export const getUser = () => {
  // 初始值为 sessionStorge中的值
  return getSession('login_use')
}