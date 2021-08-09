import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProjectList from './list'
import ProjectDetail from './detail'
import ProjectAddUpdate from './add-update'

export default class Product extends Component {
  render() {
    return (
      
      <Switch>
        <Route path='/product' component={ProjectList} exact/> {/*路径完全匹配*/}
        <Route path='/product/addupdate' component={ProjectAddUpdate}/>
        <Route path='/product/detail' component={ProjectDetail}/>
        <Redirect to='/product'/>
      </Switch>


/* <Switch>
        <Route exact path="/product" component={ProjectList} />
        <Route path="/product/detail" component={ProjectDetail} />/
        <Route path="/product/addUpdate" component={ProjectAddUpdate} />
        <Redirect to="/product" />
      </Switch> */
    )
  }
}