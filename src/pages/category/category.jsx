import React, { Component } from 'react'
import { Card,Table, Button, Message, Modal } from 'antd'; 
import { LeftOutlined ,PlusOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button'
import { reqCategory, addCategory, updateCategory } from '../../api/index'
import AddUpdateForm from './add-update-form' 
export default class Category extends Component {

  /**  
   * 状态
  */
  state = {
    categorys: [], // 分类列表数据 
    parentName: '',
    parentId: '', 
    subCategorys: [], // 二级分类列表数据
    loading: false, // 加载缓冲
    showStatus: 0, // 0:不显示 1: 显示添加 2:显示编辑
  }

  // beforeMount
  componentWillMount () {
    this.initColumns ()    
  } 
  // mounted
  componentDidMount () {
    this.getCategory() 
  } 

  // 初始化所有列信息
  initColumns = () => { 
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', 
      }, 
      {
        title: '操作',
        width: 300, 
        render: category => {   
          return ( 
            <span>            
              <LinkButton onClick={() => { 
                this.category = category // 行的集合保存到this中,方便其他地方访问  
                this.setState({showStatus: 2}) 
              }}>
                修改分类
              </LinkButton>
              {
                category.parentId === '0' ?  <LinkButton  onClick={ () => { this.getCategorySub(category) }}> 查看子类  </LinkButton>  : null  
              }          
            </span>
          )
        }  
      },
    ];
  }

  // 查询子类
  getCategorySub = async (e) => {
    this.setState({
      parentName: e.name,
      parentId: e._id
    } ) 
    let {status, data} = await reqCategory({
      parentId: e._id
    })
    if(status === 0) {
      this.setState({
        subCategorys: data
      })
    }
  }
  
  // 获取接口数据
  getCategory = async () => {   
    this.setState({ loading: true })
    const {data, status} = await reqCategory()
    this.setState({ loading: false })
    // 更新状态
    if(status === 0) {      
      this.setState ({
        categorys: data
      })   
    }  
  }

  // 保存-编辑和添加
  handleOk = () => {  
    // 输入验证
    const valid = this.form.current
    valid.validateFields().then( (values) => {
      if(values) {
        let params = {
          categoryId: this.category._id,
          parentId: valid.getFieldValue('pCategoryId'),
          categoryName: valid.getFieldValue('categoryName')
        }
        if(this.state.showStatus === 1){  
          this.addCategory(params)
        } else { 
          this.updateCategory(params)
        }
      }
    })
  }

  // 取消
  handleCancel = () => {
    this.setState({showStatus: 0})
  }

  // 新增
  addCategory = async (params) => {
    this.setState({ loading: true })
    let {status, msg} = await addCategory(params)
    this.setState({ loading: false }) 
    // 关闭
    if(status === 0) {
      Message.success(msg)
      const { parentId, parentName } = this.state 
      if(parentId === '0') {
        this.setState({
          showStatus: 0
        }, () => this.getCategory() )        
      } else {
        let {status, data} = await reqCategory({
          parentId
        })
        if(status === 0) {
          this.setState({
            showStatus: 0,
            parentId,
            parentName,
            subCategorys: data
          })
        }
      }   
    } else {
      Message.error(msg)
    }
  }

  // 修改
  updateCategory = async (data) => {
    this.setState({ loading: true })
    let {status, msg} = await updateCategory(data)
    this.setState({ loading: false }) 
    // 关闭
    if(status === 0) {      
      Message.success(msg)
      this.setState({ showStatus: 0 }, () => this.getCategory()) 
    } else {      
      Message.error(msg)
    }    
  } 

  // 返回一级分类
  showCategorys = () => {
    this.setState({ 
      parentId: '0',
    })
  }

  render() { 
    /** 
     * -----
     * 取出状态数据 
     * 更新的状态值中间引用给render()加载驱动DOM更新 
     * -----
     *  */ 
    const { categorys, loading, showStatus, subCategorys, parentName, parentId } = this.state      
    // 读取列表分类名称 给子组件
    const categoryName = this.category?.name
    // 左侧
    const title = (
      <span style={{ float: 'left' }}>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>        
        <span> { parentId !== '0' ? <LeftOutlined   /> : null } { parentId !== '0' ? parentName : undefined } </span>
      </span>
    )
    // 右侧
    const extra = (      
      <Button onClick={() => { 
        this.setState({showStatus: 1}) 
        this.category = {} // 清除遗留数据
        this.form?.current.resetFields(); // 消除异步数据/状态/验证遗留等问题
      }} type="primary" icon={ <PlusOutlined />}> 新增 </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra} >
          <Table 
            loading= {loading}
            columns={ this.columns } // 列表
            rowKey="_id"
            dataSource={ parentId === '0' ? categorys : subCategorys } 
            bordered // 边框
            pagination = { 
              {
                defaultPageSize: 20, // 指定条数
                showQuickJumper: true
              } 
            }
          />

          <Modal 
              title= { showStatus === 1 ? '添加分类' : '修改分类' }
              visible={showStatus !== 0} 
              okText="确定"
              cancelText="取消"
              onOk={this.handleOk} 
              onCancel={this.handleCancel}>
                {/* setForm 将子组件的form 传到当前父组件的 对象form中 */}
                {/* categoryName 将当前父组件的category.name 传给子组建 */}
             <AddUpdateForm setForm={ form => this.form = form } categoryName = {categoryName} parentId = {parentId} />
          </Modal>
        </Card>
      </div>
    )
  }
}
