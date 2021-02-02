## 输入框

带有兼容性的输入框，失焦时自动调整页面。防止页面高度不对;
聚焦时，会滚动输入框到视图内，防止被输入法挡住

Demo:

```jsx
import React, { useState } from 'react';
import { Input } from 'frf';

export default () => {
  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  return <Input value={text} onChange={onChange} />;
};
```
