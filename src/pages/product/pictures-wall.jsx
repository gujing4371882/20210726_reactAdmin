import React, { Component } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {delPictures} from '../../api/index'
import PropTypes from 'prop-types' // 用来校验父组件传递过来值的类型
import {getProduct}  from '../../utils/memoryUtils' 

export default class PicturesWall extends Component {

  // 默认值显示
  static propTypes = {
    imgs: PropTypes.array
  }
   
  constructor (props) { 
    super(props) 
    let fileList = [] 

    // 如果传入了imgs属性
    const {imgs} = this.props  

    if (imgs && imgs.length>0) {
      fileList = imgs.map((img, index) => ({
        uid: -index, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: '/api/upload/' + img
      }))
    } 

    // 初始化状态
    this.state = { 
      fileList // 所有已上传图片的数组
    }
  }

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  componentWillMount () {
    
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => { 
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  // 上传&&删除操作
  handleChange = ({ file, fileList }) => {  
    this.setState({ fileList }) 

    // console.log(this.state.fileList)

    // 判断图片删除 
    if(file.status === "removed") {
      this.delPictures({name: file.response?.data?.name})
    }

    // 更新操作
    this.getImgs()
  }

  delPictures = async (data) => {
    await delPictures(data)
  }

   /*
  获取所有已上传图片文件名的数组
   */
  getImgs  = () => {
    return this.state.fileList.map(item => {
      if(!item.response) {
        return item.name
      } else {
        return item.response?.data?.name
      }
    })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/api/manage/img/upload" 
          name="image" // 参数名
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
