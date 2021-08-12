import React, { Component } from 'react'
import {Card, Form, Input, Select, Button, message} from 'antd'
import { ArrowLeftOutlined , SaveOutlined } from '@ant-design/icons';

import LinkButton from "../../components/link-button";
import {getProduct}  from '../../utils/memoryUtils' 

import PicturesUpload from './pictures-wall'
import { reqCategory, addProduct, updateProduct, updateCategory } from '../../api/index'
import RichTextEditor from './rich-text-editor' 

const { TextArea } = Input;
const { Option } = Select;

export default class AddUpdate extends Component {
  constructor(props) {
    super(props);
    // 创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef()
    this.editor = React.createRef()
    this.formRef = React.createRef()
  }

  state = {
    categoryList: [], // 商品分类下拉集    
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
        let index = this.state.product?._id
        const params = {
          _id: index,
          categoryId: self.getFieldValue('categoryId'),
          pCategoryId: 0,
          name: self.getFieldValue('name'),
          desc: self.getFieldValue('desc'),
          price: self.getFieldValue('price'),
          detail: this.editor.current.getDetail(),
          imgs: this.pw.current.getImgs()
        }

        if(!index) {
          // 保存
          this.addProduct(params)  
        } else {
          // 编辑
          this.updateProduct(params)
        }
      } 
    })
  }
  
  // 新增
  addProduct = async (data) => {
    const {status} = await addProduct(data)
    if(status === 0) {
      // this.props.history.push('/product')      
      this.props.history.goBack() 
    } 
  }

  // 跳转
  updateProduct = async (data) => {
    const {status} = await updateProduct(data) 
    if(status === 0) {
      this.props.history.goBack() 
    }
  }  

  componentWillMount () {
    // 下拉
    this.getCategoryList()
    // 产品详情
    this.product = getProduct()?.key || {}
  }

  componentDidMount () { 
    if(this.product && this.product._id) {
      // 修改
      this.formRef.current.setFieldsValue( 
        {
          name: this.product.name,
          categoryId: this.product.categoryId,
          desc: this.product.desc,
          price: this.product.price,
          status: this.product.status,
          imgs: this.product.imgs,
          detail: this.product.detail,
        }
      ) 
      this.setState({
        product: this.product    
      })
    } 
  }

  // 获取分类下拉
  getCategoryList = async () => {
    const { data, status } = await reqCategory() 
    if(status === 0) {
      this.setState ({
        categoryList: data
      })
    }    
  }

  handleChange = (e) => {
    console.log(e)
  }

  render() {

    const { product } = this  
    const { imgs, detail } = product
    const { categoryList } = this.state
    // 标题 && 返回
    const title = (
      <span>
        <LinkButton onClick={ ()=> this.props.history.goBack()}> 
          <ArrowLeftOutlined Outlined />        
        </LinkButton> 
        { product._id ? '商品修改' : '商品新增' } 
      </span>
    ) 

    // 指定form中所有Item的布局
    const layout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 18,
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
        　  <Form.Item name="categoryId" label="商品分类：" rules={[{ required: true, message: '必填' }]}>
              <Select onChange={ () => this.handleChange} >
                { 
                  categoryList.map( item => (
                    <Option value={ item._id } key={item._id }>{ item.name } </Option>
                  ) ) 
                } 
              </Select>
            </Form.Item>
            <Form.Item name="price" label="商品图片：">
               {/* <div>商品图片组件</div>  */}
               <PicturesUpload ref={this.pw} imgs={ imgs } />
            </Form.Item>
            <Form.Item name="price" label="商品详情：">
               {/* <div>商品详情组件</div> */}
               <RichTextEditor ref={this.editor} detail={ detail } />               
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }} labelCol={{span: 2}} wrapperCol={{span: 20}}>
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
