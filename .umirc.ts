import { defineConfig } from 'dumi';
import px2rem from 'postcss-plugin-px2rem'
import px2ViewPort from 'postcss-px-to-viewport'

export default defineConfig({
  base: '/dumi-ui',
  publicPath: '/dumi-ui/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  title: 'frf',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  themeConfig: {
    hd: {
      // 根据不同的设备屏幕宽度断点切换高清方案
      // rules: [
      //   { maxWidth: 375, mode: 'vw', options: [100, 750] },
      //   { minWidth: 376, maxWidth: 750, mode: 'vw', options: [100, 1500] },
      // ],
      rules: [], // 禁用高清方案
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
});
