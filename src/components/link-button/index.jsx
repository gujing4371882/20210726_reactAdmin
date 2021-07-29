import React from 'react'
import './index.less'

/**
 * 自定义的 button - 作为link 的组件
 * 
 * @param {*} props 标签属性
 * {...props} 将接受的所有属性传给他的子标签 LinkButton -> button
 * children 标签属性
 *  - 字符串          <LinkButton> 退出 </LinkButton> ：退出文字
 *  - 标签对象        <LinkButton> <span></span> </LinkButton> ：<span></span>
 *  - 标签对象的数组  <LinkButton> <span></span> <span></span> </LinkButton> ：<span></span><span></span>
 * 
 */
export default function LinkButton (props) {

  return <button className="link-button" {...props}></button>
}