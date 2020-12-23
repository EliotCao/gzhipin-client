const { override, fixBabelImports, addLessLoader } = require('customize-cra');
// const rewireLess = require('react-app-rewire-less');
module.exports = override(
    addLessLoader( {
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                "@brand-primary": "#1cae82", // 正常
                "@brand-primary-tap": "#1DA57A", // 按下
            },
        }
    }),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    }),
);