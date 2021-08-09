import React, { Component } from 'react'
import {Card, Form, Input,InputNumber, Select, Button, message} from 'antd'
import { SwapLeftOutlined, SaveOutlined } from '@ant-design/icons';

import LinkButton from "../../components/link-button";
import {getProduct}  from '../../utils/memoryUtils'
// import { Redirect } from "react-router-dom";

import PicturesUpload from './pictures-wall'

const { TextArea } = Input;
const { Option } = Select;

export default class AddUpdate extends Component {

  formRef = React.createRef()

  state = {
    categoryList: [] // 商品分类下拉集
  
  }

  validatePrice = (rule, value, callback) => {
    if(!value) {
      callback( '必须指定价格!');
    } else if(value * 1 <= 0) {
      callback('价格不能为小于等于0!');
    } else {
      callback()
    }
  }

  // 提交
  handleSubmit = () => { 
    let self = this.formRef.current
    self.validateFields().then(valid => {
      if(valid) {
        message.success('成功！')
      }
    })
  }

  componentWillMount () {
    const product = getProduct()?.key
    console.log(product)
    if(product && product._id) {
      // 修改
    } else {
      // 新增
    }
  }

  componentDidMount () {
    
  }

  
  render() {
    // 路由刷新或者内存为空时候，自动跳到list
    /* const product = getProduct().key
    if(!product || !product._id) {
      return <Redirect to="/product" />
    } */

    // 标题 && 返回
    const title = (
      <span>
        <LinkButton onClick={ ()=> this.props.history.goBack()}> 
          <SwapLeftOutlined />        
        </LinkButton> 
        商品新增
      </span>
    ) 

    // 指定form中所有Item的布局
    const layout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 8,
      },
    };     

    return (
      <div>
        <Card title={title} style={{ textAlign: 'left' }} >
          <Form  {...layout} ref={this.formRef}>
        　  <Form.Item name="name" label="商品名称：" rules={[{ required: true, message: '必填' }]}>
              <Input />
            </Form.Item>
        　  <Form.Item name="desc" label="商品描述："  rules={[{ required: true, message: '必填' }]}>
              <TextArea rows={4} />
            </Form.Item>
        　  <Form.Item name="price" label="商品价格：" rules={[{ required: true, validator: this.validatePrice  }]}>
              <Input type="number" addonAfter="元" />
            </Form.Item>
        　  <Form.Item name="category" label="商品分类：" rules={[{ required: true, message: '必填' }]}>
              <Select defaultValue="lucy" onChange={ () => this.handleChange}>
                <Option value="">未选择</Option>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled"> Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
            <Form.Item name="price" label="商品图片：">
               {/* <div>商品图片组件</div> */}
               <PicturesUpload />
            </Form.Item>
            <Form.Item name="price" label="商品详情：">
               <div>商品详情组件</div>
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button onClick={ () => this.handleSubmit()} type="primary" htmlType="submit" icon={<SaveOutlined />}>
                提交
              </Button>
            </Form.Item>
      　　</Form>
        </Card>
      </div>
      
    )
  }
}
