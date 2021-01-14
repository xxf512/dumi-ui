import { defineConfig } from 'dumi';
import px2rem from 'postcss-plugin-px2rem'
import px2ViewPort from 'postcss-px-to-viewport'

export default defineConfig({
  base: '/dumi-ui',
  publicPath: '/dumi-ui/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  title: 'myTestApp',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  themeConfig: {
    hd: {
      // 根据不同的设备屏幕宽度断点切换高清方案
      rules: [
        { maxWidth: 375, mode: 'vw', options: [100, 750] },
        { minWidth: 376, maxWidth: 750, mode: 'vw', options: [100, 1500] },
      ],
      // rules: [{ mode: 'vw', options: [100, 750] }],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    }
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
      },
      'antd-mobile',
    ],
  ],
  extraPostCSSPlugins: [
    // px2rem({
    //   rootValue: 50,//开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
    //   propBlackList:['border','border-top','border-left','border-right','border-bottom','border-radius','font-size'],//这些属性不需要转换
    //   selectorBlackList:['t_npx']//以包含t_npx的class不需要转换
    // })
    // px2ViewPort({
    //   viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
    //   unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
    //   selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    //   minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    //   mediaQuery: false, // 允许在媒体查询中转换`px`
    // })
  ]
});
