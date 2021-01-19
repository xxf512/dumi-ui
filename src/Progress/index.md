
## 进度条

基本使用:

```tsx
import React from 'react';
import { Progress } from 'frf';

export default (props) => {
    const styles = {
      width: '100%',
      height: '400px',
    }

    const basePropsData = {
      percent: 50,
      targetPoint: 60,
      sAngle: 180,
      eAngle: 360,
    }

    const subTitle = {
      padding: '15px 0 9px 15px',
      color: '#000',
      fontSize: '16px',
      lineHeight: '16px',
      height: '16px',
      fontWeight: 'bolder',
    }

    const animationProps = { ...basePropsData, isAnimation: true }

    const imgProps = {
      ...basePropsData, 
      padding: 30,
      defaultColor: '//pics.sc.chinaz.com/Files/pic/icons128/7746/v10.png',
      activeColor: '//pics.sc.chinaz.com/Files/pic/icons128/7746/v1.png',
    }
    
    return <div>
      <p style={{...subTitle}}>基本使用：</p>
      <Progress styles={{...styles}} className={'test'} {...basePropsData}/>
      <p style={{...subTitle}}>动画：</p>
      <Progress styles={{...styles}} className={'test'} {...animationProps}/>
      <p style={{...subTitle}}>图片：</p>
      <Progress styles={{...styles}} className={'test'} {...imgProps}/>
    </div>
}
```
<API></API>
