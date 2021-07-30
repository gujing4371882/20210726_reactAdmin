import React, { Component } from 'react'
import { Card,Table, Select, Input, Button, Message, Modal } from 'antd'; 
import { PlusOutlined,SearchOutlined } from '@ant-design/icons';

import LinkButton from "../../components/link-button"; 
const { Option } = Select;

export default class Product extends Component {

  state = {
    products: [],
    loading: false,

  }
 
  componentWillMount () {
    this.initColumns ()    
  }  
  componentDidMount () { 
    this.getProductMock()
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
        dataIndex: 'status', 
        width: 80,
        render: (status) => {
          let btnText= '下架'
          let text = '在售'
          if(status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return ( 
            <span> 
              <Button size="small" type="primary">{btnText}</Button> 
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
            <LinkButton>
              详情
            </LinkButton>
            <LinkButton>
              修改
            </LinkButton>
          </span>
        ),
      },
    ]
  }

  getProductMock = () => { 
    this.setState({ loading: true })
    this.setState ({
      products: [
        { _id: '1', name: 'JB', desc: '撒否哦为128312', price: 1000.00, status: 1 },
        { _id: '2', name: 'JG', desc: '委屈饿11213', price: 2000.00, status: 1 },
        { _id: '3', name: 'JM', desc: '213131sdwew问问', price: 5000.00, status: 2 },
        { _id: '4', name: 'JS', desc: '额外全额完全耳温枪12', price: 3000.00, status: 1 },
        { _id: '5', name: 'JF', desc: '额为全额趣味32342', price: 4000.00, status: 2 },
      ]
    }) 
    this.setState({ loading: false }) 
  }

  render() {

    const {loading, products } = this.state
    const title = (
      <div style={{ textAlign: 'left' }}>
        <Select defaultValue="1" style={{ width: 280, margin: '0 5px' }} allowClear>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 280, margin: '0 5px' }} />
        <Button type="primary" icon={ <SearchOutlined />} style={{ margin: '0 5px' }} >搜索</Button>
      </div>
    )
   
    const extra = (
      <Button type="primary" icon={ <PlusOutlined />}> 新增商品 </Button>
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
              defaultPageSize: 4, // 指定条数
              showQuickJumper: true,
              total: 50
            } 
          }
        />
      </Card>
    )
  }
}
