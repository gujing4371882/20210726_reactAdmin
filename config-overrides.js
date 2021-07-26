// customize-cra 修改webpack配置等
const { override, fixBabelImports} = require('customize-cra');
// 
module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd-mobile',
     libraryDirectory: 'es',
     style: 'css',
   }),
);