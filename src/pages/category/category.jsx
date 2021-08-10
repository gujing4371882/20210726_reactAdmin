import React, { Component } from 'react'
import { Card,Table, Button, Message, Modal } from 'antd'; 
import { PlusOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button'
import { reqCategory, addCategory, updateCategory } from '../../api/index'
import AddUpdateForm from './add-update-form'
/**
 * 
 * 品类管理
 * 
 * 
 */
export default class Category extends Component {

  /**  
   * 状态
   */
  state = {
    categorys: [], // 分类列表数据  
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
        render: category => (
          <LinkButton onClick={() => { 
            this.category = category // 行的集合保存到this中,方便其他地方访问  
            this.setState({showStatus: 2}) 
          }}>
            修改分类
          </LinkButton>
        ),
      },
    ];
  }
  
  // 获取接口数据
  getCategory = async () => {   
    this.setState({ loading: true })
    const categorys = await reqCategory()
    this.setState({ loading: false })
    // 更新状态
    this.setState ({
      categorys 
    })     
  } 

  // 保存-编辑和添加
  handleOk = () => {  
    // 输入验证
    const valid = this.form.current
    valid.validateFields().then( (values) => {
      if(values) {
        if(this.state.showStatus === 1){ 
          this.addCategory({categoryName: valid.getFieldValue('categoryName')})
        } else { 
          this.updateCategory({categoryId: this.category._id, categoryName: valid.getFieldValue('categoryName')})
        }
      }
    })
  }

  // 取消}
  handleCancel = () => {
    this.setState({showStatus: 0})
  }

  // 新增
  addCategory = async (data) => {
    this.setState({ loading: true })
    let res = await addCategory(data)
    this.setState({ loading: false }) 
    // 关闭
    if(res) {    
      Message.success('添加成功！')  
      this.setState({ showStatus: 0 }) 
    }
    this.getCategory()
  }

  // 修改
  updateCategory = async (data) => {
    this.setState({ loading: true })
    let res = await updateCategory(data)
    this.setState({ loading: false }) 
    // 关闭
    if(res) {      
      Message.success('修改成功！')
      this.setState({ showStatus: 0 }) 
    }
    this.getCategory()
  } 

  render() { 
    /** 
     * -----
     * 取出状态数据 
     * 更新的状态值中间引用给render()加载驱动DOM更新 
     * -----
     *  */ 
    const { categorys, loading, showStatus } = this.state      
    // 读取列表分类名称 给子组件
    const categoryName = this.category?.name

    // card 右侧结构
    const extra = (
      // onClick 事件定义,而非事件调用
      // 如在其中修改状态，可外套一个函数，即为定义一个执行函数
      <Button onClick={() => { 
        this.setState({showStatus: 1}) 
        this.category = {} // 清除遗留数据
        this.form?.current.resetFields(); // 消除异步数据/状态/验证遗留等问题
      }} type="primary" icon={ <PlusOutlined />}> 新增 </Button>
    )

    return (
      <div>
        <Card extra={ extra} >
          <Table 
            loading= {loading}
            columns={ this.columns } // 列表
            rowKey="_id"
            dataSource={ categorys }
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
             <AddUpdateForm setForm={ form => this.form = form } categoryName = {categoryName} />
          </Modal>
        </Card>
      </div>
    )
  }
}
