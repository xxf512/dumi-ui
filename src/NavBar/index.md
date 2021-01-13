
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
<API></API>
More skills for writing demo: https://d.umijs.org/guide/demo-principle
