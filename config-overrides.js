// customize-cra 修改覆盖webpack配置等
const { override, fixBabelImports, addLessLoader} = require('customize-cra');
const theme = require("./package.json").theme;

module.exports = override(
  // 按需打包
  fixBabelImports('import', { // import -> babel-plugin-import 
    libraryName: 'antd', // 
    libraryDirectory: 'es', // 源码文件夹的ES文件夹
    // style: 'css', // 自动打包相关的CSS文件
    style: true // less
  }),
  addLessLoader({
    lessOptions:{
      javascriptEnabled:true,
      modifyVars: theme
    }
  }),
);