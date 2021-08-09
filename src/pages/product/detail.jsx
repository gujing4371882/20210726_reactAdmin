import React, { Component } from 'react'

import {Card, List} from 'antd'
import { SwapLeftOutlined } from '@ant-design/icons';
import LinkButton from "../../components/link-button";

import './detail.less' 
import {getProduct}  from '../../utils/memoryUtils'
import { Redirect } from "react-router-dom";

export default class Detail extends Component {
  render() {

    // 路由刷新或者内存为空时候，自动跳到list
    const product = getProduct().key
    if(!product || !product._id) {
      return <Redirect to="/product" />
    }

    const title = (
      <span>
        <LinkButton onClick={ ()=> this.props.history.goBack()}> 
          <SwapLeftOutlined />        
        </LinkButton> 
        商品详情
      </span>
    ) 
    
    return (
      <Card title={title} style={{ textAlign: 'left' }} className="detail">
        <List> 
          <List.Item > 
            <span className="detail-left">商品名称：</span>
            {product.name}
          </List.Item> 
          <List.Item > 
            <span className="detail-left">商品描述：</span>
            {product.desc}
          </List.Item> 
          <List.Item > 
            <span className="detail-left">商品价格：</span>
            {product.price}
          </List.Item> 
          <List.Item > 
            <span className="detail-left">商品分类：</span>
             {product.categoryId}
          </List.Item> 
          <List.Item style={{ display: 'block' }}> 
            <span className="detail-left">商品图片：</span>          
            {
              product.imgs.map (item => {
                return <img className="detail-img" key="{item}" src={item}  alt="商品图片" />
              })
            }
          </List.Item> 
          <List.Item style={{ display: 'block' }}>
            <span className="detail-left">商品详情：</span>
              送的开发开放就阿 
            <div style={{ marginLeft: '120px'}} dangerouslySetInnerHTML= { { __html: product.detail  } }></div>
          </List.Item>
        </List>  
      </Card>
    )
  }
}
