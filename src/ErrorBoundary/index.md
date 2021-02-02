## 错误处理组件

描述： 当 render 方法出错时，用于展示对应的页面，防止页面白屏

Demo:
在入口文件里面使用，将根组件包裹

```jsx | pure
import React from 'react'
import { ErrorBoundary } from 'frf'
  .....
<ErrorBoundary><App /></ErrorBoundary>
```
