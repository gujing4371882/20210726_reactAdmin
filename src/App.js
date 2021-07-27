// import logo from './logo.svg';
import React, { Component } from "react";
import './App.css'; 

import { BrowserRouter, HashRouter, Switch, Route} from 'react-router-dom'
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
            <Route path="/" component={Admin} /> 
          </Switch> 
        </HashRouter>
      </div> 
    )
  }
}

  