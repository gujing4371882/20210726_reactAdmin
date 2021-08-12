import React, { Component } from 'react'
import { Card,Table, Select, Input, Button, Message, Modal } from 'antd'; 
import { PlusOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import LinkButton from "../../components/link-button"; 
import {setProduct, getProduct} from '../../utils/memoryUtils';
import { getProducts, getProductsSearch, updateStatusProduce, reqSearchProducts, updateProduct } from '../../api/index';  

const { Option } = Select;
const { confirm } = Modal;
export default class Product extends Component {

  state = {
    products: [],
    loading: false,
    searchType: 'productName', // 默认按商品名称搜素
    searchName: '', // 搜索的关键字
    total: 0,
    pageNum: 1,
    pageSize: 5,
  }
 
  componentWillMount () {
    this.initColumns ()    
  }

  componentDidMount () { 
    this.getProduct()
  } 
  
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        width: 240,
        dataIndex: 'name', 
      }, 
      {
        title: '商品描述',
        dataIndex: 'desc', 
      }, 
      {
        title: '价格',
        dataIndex: 'price', 
        width:120,
        render: (price) => {
          return '￥' + price
        }
      }, 
      {
        title: '状态', 
        width: 80,
        render: (row) => {
          let btnText= '下架'
          let text = '在售'
          if(row.status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return ( 
            <span> 
              <Button size="small" type="primary" onClick={ () => this.handleUpdateStatus(row)}>{btnText}</Button> 
              <span>{text}</span>
            </span>   
          )
        }
      }, 
      {
        title: '操作',
        width: 100, 
        render: product => (
          <span>
            <LinkButton onClick={ () => this.handleDetail(product)}>
              详情
            </LinkButton>
            <LinkButton onClick= { () => {
              setProduct(product)
              this.props.history.push('/product/addUpdate')
            }}>
              修改
            </LinkButton>
          </span>
        ),
      },
    ]
  }

  // 条件查询
  handleSearch = () => { 
    this.getProductsSearch(this.pageNum, this.state.searchType, this.state.searchName)
  } 
  
  handleDetail = (product) => {
    setProduct(product) 
    this.props.history.push('/product/detail') 
  }

  // 更新状(态
  handleUpdateStatus = (row) => { 
    const _this = this
    // api
    confirm({
      title: row.status === 1 ? '是否下架？' : '是否上架？',
      icon: <ExclamationCircleOutlined />, 
      okText: '确认',
      cancelText: '取消',
      onOk() {
        _this.updateStatusProduce({
          productId: row._id,
          status: row.status === 1 ? 2 : 1
        })
      },
      onCancel() { },
    });
  }

  // 默认查询
  getProduct = async () => {
    this.setState({ loading: true }) 
    const { pageNum, pageSize } = this.state   
    let { data, status } = await getProducts ({
      pageNum, pageSize
    }) 
    this.setState({ loading: false }) 
    if(status === 0) { 
      this.setState({
        products: data.list,
        total: data.total
      })
    }
  }

  // 搜索查询
  getProductsSearch = async () => {    
    const {pageNum, pageSize, searchName, searchType} = this.state
    this.setState({ loading: true }) 
    let { data, status } = await reqSearchProducts ({
      pageNum, pageSize, searchName, searchType
    }) 
    this.setState({ loading: false }) 
    if(status === 0) {      
      this.setState({
        products: data.list,
        total: data.total
      }) 
    } else {
      // Message.error(data.msg)
    }
  }

  onChange = (pageNum) => {
    this.setState({
      pageNum
    }, () => {
      this.getProductsSearch()
    })
  } 

  // 
  updateStatusProduce = async (data) => {
    const {status, msg} = await updateStatusProduce(data) 
    if(status === 0) {
      Message.success(msg)
    } else {
      Message.error(msg)      
    } 
    this.getProductsSearch()
  }

  render() {
    // 获取状态数据
    const {loading, products, searchType, searchName, total, pageSize } = this.state
    // 标题样式
    const title = (
      <div style={{ textAlign: 'left' }}>
        <Select defaultValue={searchType} style={{ width: 280, margin: '0 5px' }} allowClear
          onChange={ (value) => {
            this.setState({ searchType: value })
          }} 
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 280, margin: '0 5px' }}  defaultValue={searchName} 
          onChange= { (e) => {
            this.setState({searchName: e.target.value})
          }}
        />
        <Button type="primary" icon={ <SearchOutlined />} style={{ margin: '0 5px' }} onClick={ this.handleSearch } >搜索</Button>
      </div>
    )
    
    const extra = (
      <Button type="primary" icon={ <PlusOutlined />} onClick={ () => {
        // 清空数据 
        // 跳转
        this.props.history.push('/product/addUpdate')
      }}> 新增商品 </Button>
    )

    return (
      <Card title={title} extra={ extra } >
        <Table 
          loading= {loading}
          columns={ this.columns } // 列表
          rowKey="_id"
          dataSource={ products }
          bordered // 边框
          pagination = { 
            {
              onChange: this.onChange ,
              defaultPageSize: pageSize, // 指定条数
              showQuickJumper: true,
              total
            } 
          }
        />
      </Card>
    )
  }

}
