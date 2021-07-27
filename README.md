## 调整 && 补充

<!-- 下载antd -->
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