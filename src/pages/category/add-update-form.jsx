import React, { Component } from 'react'
import {Form, Input} from 'antd'
import PropTypes from 'prop-types' // 用来校验父组件传递过来值的类型
/**
 * 添加 && 编辑
 * 
 */
class AddUpdateForm extends Component {
  // props 
 
  formRef = React.createRef()   

  static propTypes = {
    setForm: PropTypes.func.isRequired, // isRequired 必填
    categoryName: PropTypes.string
  }

  onFinish = () => { }
 
  // 给父组件传值
  componentWillMount () {    
    this.props.setForm( this.formRef) 
  }

  // 更新值
  componentDidMount () { 
    const { categoryName } = this.props  
    this.formRef.current.setFieldsValue({categoryName: categoryName ? categoryName : '' })
  }
  // 更新值
  componentDidUpdate () {
    const { categoryName } = this.props  
    this.formRef.current.setFieldsValue({categoryName: categoryName ? categoryName : '' })
  }
  
  render() {   
   
    return (
      <Form onFinish={this.onFinish} ref={this.formRef}>
    　  <Form.Item name="categoryName" label="分类名称：" rules={[{ required: true, message: '必填' }]}>
          <Input />
        </Form.Item>
  　　</Form>
    ) 
  }
}

export default AddUpdateForm