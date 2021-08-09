import React, { Component } from 'react'
import { Card,Table, Select, Input, Button, Message, Modal, message } from 'antd'; 
import { PlusOutlined,SearchOutlined } from '@ant-design/icons';

import LinkButton from "../../components/link-button"; 
import {setProduct, getProduct} from '../../utils/memoryUtils'

const { Option } = Select;

export default class Product extends Component {

  state = {
    products: [],
    loading: false,
    searchType: 'productName', // 默认按商品名称搜素
    searchName: '', // 搜索的关键字
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
        // dataIndex: 'status', 
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

  getProductMock = () => { 
    this.setState({ loading: true })
    this.setState ({
      products: [
        { _id: '1', name: 'JB', desc: '撒否哦为128312', price: '1000.00',categoryId: '1', status: 1, imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'],detail: '<a>nihaowreqrewqrrrrrrrrrrrrrrrrrrrrrrrrrrrewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr </a><b>dsafpiqpaopfdaokfpafdasfijdafkdlafasewrewrwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfdasfd</b><img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />' },
        { _id: '2', name: 'JG', desc: '委屈饿11213', price: '2000.00', categoryId: '2',status: 1, imgs: [ 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'],detail: ' <b>dsafpiqpaopfdaokfpafdasfijdafkdlafasewrewrwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfdasfd</b><img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />'  },
        { _id: '3', name: 'JM', desc: '213131sdwew问问', price: '5000.00', status: 2,categoryId: '1', imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],detail: '<a>nihaowreqrewqrrrrrrrrrrrrrrrrrrrrrrrrrrrewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr </a> <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />'  },
        { _id: '4', name: 'JS', desc: '额外全额完全耳温枪12', price: '3000.00',categoryId: '3', status: 1, imgs: [],detail: ''  },
        { _id: '5', name: 'JF', desc: '额为全额趣味32342', price: '4000.00', categoryId: '1',status: 2, imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'],detail: ' <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />'  },
      ]
    }) 
    this.setState({ loading: false }) 
  } 

  // 条件查询
  handleSearch = () => {
    console.log( this.state.searchType, this.state.searchName)
    // api
  }
  // 更新状(态
  handleUpdateStatus = (row) => {
    console.log(row)
    // api
  }

  handleDetail = (product) => {
    setProduct(product) 

    this.props.history.push('/product/detail') 
  }

  render() {
    // 获取状态数据
    const {loading, products,searchType, searchName } = this.state
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
