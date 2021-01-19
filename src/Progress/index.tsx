import React, { useRef, useEffect } from 'react'
import Draw from './draw'
import { propsType } from './type'

type style = {
  className?: string,
  styles?: object
}
const Progress = (props: propsType & style) => {
  const { className = '', styles = {}, ...rest } = props;
  const progressDiv = useRef<HTMLDivElement>(null);
  const progressCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const options = {
      box: progressDiv.current, // 父元素
      item: progressCanvas.current, // 子元素
      ...rest
    };
    const canvas = new Draw(options);
  }, [className, styles]);

  return <div style={{ ...styles }} ref={progressDiv} className={className}>
    <canvas ref={progressCanvas}/>
  </div>
}

export default Progress
