# 调整 && 补充

## 1 启用项目开发
  1)使用react脚手架创建项目: 
    - npm install -g create-react-app
    - create-react-app 你的项目名
    - cd 项目名
    - npm run start 
  
  2)开发环境运行: npm run start

  3)生产环境打包运行: npm run build && serve -s build
## 2 git管理项目
  1)创建远程库 (github || gitLabel等)
  2)创建本地仓库:
    - 配置.gitignore 文件
    - git init 
    - git add .
    - git commit -m 'init'
  3)将本地推送远程
    - git remote add origin 远程地址
    - git push origin master 推送至远程master,自动创建master分支
  4)本地创建dev分支
    - git checkout -b dev
    - git push origin dev
  5)本地又修改
    - git add .
    - git commit -m 'xxx'
    - git push origin dev
  6)克隆仓库
    - git clone -b 分支名称 远程地址
  7)远程修改
    - git pull origin 分支名称
  
## 3 项目的基本结构 
  api: ajax请求的模块
  components: 非路由组件
  pages: 路由组件
  App.js: 应用的根组件
  index.js: 入口JS

## 4 引用antd

<!-- 下载antd$ -->
yarn add antd
<!-- 
react-app-rewired   作用是用来帮助你重写react脚手架配置
customize-cra       修改webpack的配置
babel-plugin-import 按需加载
-->
yarn add react-app-rewired customize-cra babel-plugin-import

<!-- 配置文件 -->
config-overrides.js 

const { override, fixBabelImports} = require('customize-cra');
module.exports = override(
  // 按需打包
  fixBabelImports('import', { // import -> babel-plugin-import 
    libraryName: 'antd', // 
    libraryDirectory: 'es', // 源码文件夹的ES文件夹
    style: 'css', // 自动打包相关的CSS文件
  }),
);

<!-- 修改package.json 打包指向按需配置文件-->
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
// package.json react-app-rewired start/build/test 命令指向当前的配置 【 config-overrides.js 】


<!-- antd -->
自定义antd的主题
yarn add less less-loader 

config-overrides.js 补充
const {..., addLessLoader } = require('customize-cra');
...
addLessLoader({
  lessOptions:{
    javascriptEnabled:true,
    modifyVars: { '@primary-color' : '#1DA57A' } // theme
  }
}),// 注意更早的版本 使用 addLessLoader({modifyVars:theme}) 配置 


<!-- 获取form表单值  -->
/**
  * Ref 获得实例
  * getFieldValue 获取单个字段值
  * getFieldsValue 获取多个字段值
  * validateFields 获取验证后字段值
  */
const form = this.formRef.current 
const fileds = form.getFieldsValue(['Username','Password'])
    
## 5 引用路由

// 路由是什么? 映射关系, 类似key => value 键值对的关系, key (path) && value
// { 前台: component path映射的一个组件, 后台:回调函数 (针对不同的path,处理不同的业务逻辑) }

yarn add react-router-dom 

withRouter: 包装非路由组件，给其传入history、location、match
history: push()/replace()/goBack()
location: pathname 属性
match：params 路由传参

### Seitch 等

？？？？？？


## 6 接口测试 
postman


## 7 前后台交互
yarn add axios

<!-- 代理 -->
package.json => 
"proxy": "http://xxx"

- 代理的理解?
webpack-dev-server (本地开发服务器) => http-proxy-middleware (实现代理)

react 实现多代理 
config/setupProxy.js


promise

async await  
- 简化promise对象的使用,不再使用then()指定回调函数
- 同步编码方式实现异步流程


## 8、登录检查 -自动登录
utils/storageUtils.js
localStorage  ||  sessionStorage 

内存中读取
utils/memoryUtils.js || redux

<!-- 两种自动登录方式 -->
this.props.history.replace('/login')  // 事件回调函数中路由跳转
return <Redirect to="/login" /> // 自动跳转到指定的路由路径


## JSONP 接口
npm i jsonp


## 100 周期
componentWillMount(): 第一次 render() 前调用一次，为第一次render()准备数据 （ 同步 ）
componentDidMount()：第一次 render() 后调用一次，启动异步任务，后面异更新步状态，重新 render()

## 10000 补充需求
react 代码片段 - 快捷写法
ES7 React/Redux/GraphQL/React-Native snippets

## 10001 高阶函数 && 高阶组件

1）高阶函数： 接受的参数或者返回值 是函数
如：数组遍历方法 || 定时器 || promise || 高阶组件 || bind() || apply() || 闭包 
作用：实现动态

2）高阶组件（本质是一个函数）
函数接受一个组件，返回一个新的组件

3）高阶组件是一个特别的高阶函数


## map && reduce


## 工具函数
UNDERSCORE.js
lodash.js


# 防抖和节流


节流


防抖：