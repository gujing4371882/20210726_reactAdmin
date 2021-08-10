import React, { Component } from 'react'
import {Card, Form, Input,InputNumber, Select, Button, message} from 'antd'
import { SwapLeftOutlined, SaveOutlined } from '@ant-design/icons';

import LinkButton from "../../components/link-button";
import {getProduct}  from '../../utils/memoryUtils'
// import { Redirect } from "react-router-dom";

import PicturesUpload from './pictures-wall'
import { reqCategory } from '../../api/index'

import RichTextEditor from './rich-text-editor'
/* import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; */

const { TextArea } = Input;
const { Option } = Select;

export default class AddUpdate extends Component {
  constructor(props) {
    super(props);
    // 创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef()
    this.formRef = React.createRef()
  }

  state = {
    categoryList: [], // 商品分类下拉集
    product: {}
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
    const pics = this.pw.current.state.fileList?.map(item => {
      return item.response?.data?.name
    })
    console.log(pics)
  
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
    this.getCategoryList()
  }

  // 获取分类下拉
  getCategoryList = async () => {
    const categoryList = await reqCategory()    
    this.setState ({
      categoryList
    })
  }
 
  render() {
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
    
    const { categoryList, product } = this.state

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
                { 
                  categoryList.map( item => (
                    <Option value={ item._id } key={item._id }>{ item.name } </Option>
                  ) ) 
                } 
              </Select>
            </Form.Item>
            <Form.Item name="price" label="商品图片：">
               {/* <div>商品图片组件</div>  */}
               <PicturesUpload ref={this.pw} imgs={product.imgs} />
            </Form.Item>
            <Form.Item name="price" label="商品详情：">
               {/* <div>商品详情组件</div> */}
               <RichTextEditor />
               {/* <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                />; */}
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
