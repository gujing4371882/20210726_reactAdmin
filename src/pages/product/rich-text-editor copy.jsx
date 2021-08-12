import React, { Component } from 'react' 
import { EditorState, convertToRaw, ContentState, AtomicBlockUtils } from 'draft-js' 
import 'draft-js/dist/Draft.css'; 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; 
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'; 
import './rich-text-editor.less'
import PropTypes from 'prop-types' // 用来校验父组件传递过来值的类型
 
 
export default class RichTextEditor extends Component {

  // 默认值显示
  static propTypes = {
    detail: PropTypes.string
  }

  constructor(props) { 
    super(props) 
    this.state = { 
      editorState: EditorState.createEmpty(), 
    } 
    this.onChange = this.onChange.bind(this) 
    this.makeMedia = this.makeMedia.bind(this) 
  }

  onChange(editorState) { 
    this.setState({ editorState }) 
  }

  makeMedia(type){ 

    const {editorState} = this.state; 
    const contentState = editorState.getCurrentContent(); 
    const contentStateWithEntity = contentState.createEntity(
      type, 
      'IMMUTABLE', 
      {} 
    ) 
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey(); 
    const newEditorState = EditorState.set(editorState,{currentContent:contentStateWithEntity}) 
    this.setState({ 
      /* editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState, 
        entityKey, 
        '' // '' 改成 ' '
      ),
 */
       
    })
  } 

  formSubmit = () =>{
    // 转换成HTML格式 
    var editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) 
    this.props.saveSys({roomnotes: editorContent})
  } 

  componentWillReceiveProps(nextProps) {
    if (this.props.getSysResult !== nextProps.getSysResult && nextProps.getSysResult.data) {
      // 匹配富文本编辑器格式，回显保存的内容
      const contentBlock = htmlToDraft(nextProps.getSysResult.data.roomnotes);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ editorState })
      }
    }

    console.log(this.props.detail)
  } 

  onEditorStateChange = (editorState) => { 
    this.setState({ editorState })

    draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) 
  }

  handelUpload = async (e) => {
    var formData = new FormData(); 
    formData.append("image", e.target.files[0]);  
    let res = await fetch("/api/manage/img/upload", {
      method: "POST",  
      body: formData,
    })
    res.json().then((response) => { 
    });
 
  }

  uploadImageCallBack = (e)=>{    
    return new Promise ( async (resolve, reject) => {
      var formData = new FormData(); 
      formData.append("image", e);  
      let res = await fetch("/api/manage/img/upload", {
        method: "POST",  
        body: formData,
      })
      let result = await res.json()
      if(result.status !== 0) {
        reject( { data: {link: ''} })
      } else {        
        resolve({data: {link: result.data.url}}) 
      } 
    }) 
  } 

  getEditorHtml = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  render() { 
    return (
     <div className="editor"> 
      <button onClick={()=>this.makeMedia('audio')}>audio</button> 
      <button onClick={()=>this.makeMedia('video')}>video</button>  
      <Editor
        style={{ border: '1px solid #000' }} 
        editorState={this.state.editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={ this.onEditorStateChange }
        // blockRendererFn={ mediaBlockRenderer }
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

     </div> 
    ) 
} 
 
}

// 
function mediaBlockRenderer(block) { 
  console.log(block.getType()) 
  if (block.getType() === 'atomic') { 
    return { 
    component: Media, 
    editable: false, 
    }; 
  }
  return null; 
} 
// 
const Audio = (props)=>{ 
  return <audio controls/> 
} 
// 
const Video = (props)=>{ 
  return <Video controls/> 
} 
// 
const Media = (props)=>{ 
  let media; 
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0) 
  ) 
  const type = entity.getType(); 
  if(type === 'audio'){ 
    media = <Audio/> 
  } 
  else if (type === 'video'){ 
    media = <Video/> 
  } 
  return media; 
} 
