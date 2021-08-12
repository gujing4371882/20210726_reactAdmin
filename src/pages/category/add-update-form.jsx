import React, { Component } from 'react'
import {Form, Input, Select } from 'antd'
import PropTypes from 'prop-types' // 用来校验父组件传递过来值的类型

import { reqCategory } from '../../api/index'
const { Option } = Select;
/**
 * 添加 && 编辑
 * 
 */
class AddUpdateForm extends Component {
  // props 
 
  formRef = React.createRef()   

  static propTypes = {
    setForm: PropTypes.func.isRequired, // isRequired 必填
    categoryName: PropTypes.string,
    parentId: PropTypes.string,
  }

  state = {
    categoryList: []
  }

  onFinish = () => { }
 
  // 给父组件传值
  componentWillMount () {    
    this.props.setForm( this.formRef) 
    this.getCategoryList() 
  }

  // 更新值
  componentDidMount () { 
    const { categoryName, parentId } = this.props  
    this.formRef.current.setFieldsValue({categoryName: categoryName ? categoryName : '', pCategoryId: parentId ? parentId : '0'  })
  }
  // 更新值
  componentDidUpdate () {
    const { categoryName, parentId } = this.props  
    this.formRef.current.setFieldsValue({categoryName: categoryName ? categoryName : '', pCategoryId: parentId ? parentId : '0'  })
  }

  // onCurrencyChange = (e) => { }
  
   // 获取分类下拉
  getCategoryList = async () => {
    const { data, status } = await reqCategory() 
    if(status === 0) {
      this.setState ({
        categoryList: data
      })
    }    
  }

  render() {    
    const { categoryList } = this.state
    return (
      <Form onFinish={this.onFinish} ref={this.formRef}> 
        <Form.Item name="pCategoryId" label="分类级别：">
          <Select defaultValue="0" >
            <Option value="0">一级分类</Option> 
            { 
              categoryList.map( item => (
                <Option value={ item._id } key={item._id }>{ item.name } </Option>
              ) ) 
            } 
          </Select> 
        </Form.Item>
    　  <Form.Item name="categoryName" label="分类名称：" rules={[{ required: true, message: '必填' }]}>
          <Input />
        </Form.Item>
  　　</Form>
    ) 
  }
}

export default AddUpdateForm