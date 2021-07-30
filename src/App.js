// import logo from './logo.svg';
import React, { Component } from "react";
import {  HashRouter, Switch, Route, Redirect} from 'react-router-dom' 

import './App.css'; 
import Admin from './pages/admin/admin'
import Login from './pages/login/login'


/** 应用根组件 */ 

/** 函数function组件 && 类class组件 */
export default class App extends Component {  
  render () {
    return ( 
      <div  className="App"> 
        <HashRouter> 
        {/* BrowserRouter 去除 # 号 */} 
          <Switch> 
            <Route path="/login" component={Login} /> 
            {/* 方式一 */}
            <Route path="/" component={Admin} /> 
            {/* 方式二 */}
            {/* <Route path="/admin" component={Admin} />  */}
            {/* <Redirect to="/admin"/> */}
          </Switch> 
        </HashRouter>
      </div> 
    )
  }
}

  