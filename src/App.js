// import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import {Button, Message} from 'antd' // 首字母大写

/** 应用根组件 */ 

/** 函数function组件 && 类class组件 */
export default class App extends Component {

  handleClick = () => {
    Message.success('成功!')
  }

  render () {
    return ( 
      <div  className="App"> 
        App  
        <Button type="primary" onClick= { this.handleClick }>提交</Button>
      </div> 
    )
  }
}


/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> 
      </header>
    </div>
  );
}
export default App;
 */
 
