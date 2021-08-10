import React, { Component } from 'react'
import { Message } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'; 

import { uploadImages } from '../../api/index'

import './rich-text-editor.less'

// 测试
import axios from 'axios' 

export default class RichTextEditor extends Component {

  state = {
    editorState: ''
  }


  formSubmit = () =>{
    // 转换成HTML格式
    var editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    this.props.saveSys({roomnotes: editorContent})
  } 

  componentWillReceiveProps(nextProps) {
    if (this.props.getSysResult!==nextProps.getSysResult && nextProps.getSysResult.data) {
      // 匹配富文本编辑器格式，回显保存的内容
      const contentBlock = htmlToDraft(nextProps.getSysResult.data.roomnotes);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ editorState })
      }
    }
  } 

  onEditorStateChange = (editorState) => {
    this.setState({ editorState })
  }

  handelUpload = (e) => { 
  
  }

  uploadImageCallBack = (e)=>{ 
 
        
    /* return new Promise(
      async (resolve, reject) => { 

        // let formData = new FormData()
        // formData.append('image', file)
        // let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {}

        // let upload = await uploadImages (formData)
        // console.log(upload)

        // fetch(`你自己的接口地址`, {
        //   method: 'POST',
        //   headers: {
        //   'store-user-token':subsystemTourInfo.token
        //   },
        //   body: formData,
        // }).then(res => {
        //   return res.json()
        // }).then(res => {
        //   if (res.err !== 0) {
        //     Message.error('图片上传失败', 2)
        //     reject(res)
        //   } else {
        //     resolve({data: {link: res.fileId}})
        //   }
  
        // }).catch(err => {
        //   reject(err)
        // })
      }
    ) */
  } 
 
  render() {
    return (
      <div>
        <Editor
          style={{ border: '1px solid #000' }}
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={ this.onEditorStateChange }
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
              uploadCallback: this.uploadImageCallBack,
              previewImage: true,
              inputAccept: 'image/*',
              alt: { present: false, mandatory: false,previewImage: true}
            },
          }} 
        /> 

        <div>
          {/* <input type="file" onChange={this.handelUpload} /> */}

          <form action="/api/manage/img/upload" method="post" name="f_upload" enctype="multipart/form-data" > 
            <input type="file" name="image"  /><br/>
            <input type="submit" value="上传" />
          </form>

        </div>
      </div>
    )
  }
}
