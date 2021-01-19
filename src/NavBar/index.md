
## 导航栏

Demo:

```tsx
import React from 'react';
import { NavBar } from 'frf';

export default () => (
  <NavBar
    rightContent={<span onClick={() => console.log('点击更多')}>更多</span>}
  >
    <div
      style={{ paddingTop: 30, paddingLeft: 40, height: 200 }}
    >
      这是一个测试内容
    </div>
    <div
      style={{ paddingTop: 30, paddingLeft: 40, height: 200 }}
    >
      这是一个测试内容
    </div>
    <div
      style={{ paddingTop: 30, paddingLeft: 40, height: 200 }}
    >
      这是一个测试内容
    </div>
  </NavBar>
);
```
## 规则
- 由于场景是端内打开，因此需要传入closeWeb的方法，在history为1时，点击返回自动调用，一般closeWeb就是调用端内关闭H5的ridge方法；如果history不为1，则判断是否用了react-router，是则调用history.goBack()，否则调用window.history.back()，也可以自定义返回点击事件
- 标题默认是本页面的title，而且会自动跟随document.title变化。
- 把页面内容放入组件内部即可，而且是局部滚动，body会被设置over-flow:hidden。

<API></API>
<!-- More skills for writing demo: https://d.umijs.org/guide/demo-principle -->
