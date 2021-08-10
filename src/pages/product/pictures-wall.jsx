import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {delPictures} from '../../api/index'
import PropTypes from 'prop-types' // 用来校验父组件传递过来值的类型

export default class PicturesWall extends Component {

  // 默认值显示
  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  componentWillMount () {
    // 根据imgs生成filelist
    const imgs = this.props.imgs
    if(imgs && imgs.length > 0) {
      const fileList = imgs.map((item, index) => ({
        uid: -index,
        name: item.name,
        status: 'done',
        url: '/api/' + item.img
      }) )

      this.setState ({
        fileList
      })
    }
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
    console.log(file)
    this.setState({ fileList }) 
    // 判断图片删除 
    if(file.status === "removed") {
      this.delPictures({name: file.response?.data?.name})
    }
  }

  delPictures = async (data) => {
    await delPictures(data)
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
