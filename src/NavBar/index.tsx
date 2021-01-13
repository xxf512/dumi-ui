/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createBrowserHistory } from 'history'
import { Icon } from 'antd-mobile'

import './index.less'
/**
 * 类名命名,返回函数cx(),支持数组
 * @param {String} classPrefix  - className
 */
const classFix = (classPrefix: string) => (className: Array<String> | String = '') => {
  if (typeof className === 'string') return classPrefix ? `${classPrefix}-${className}` : classPrefix
  else if (Array.isArray(className) && className.length > 0) return className.map(i => (i || i === 0) ? `${classPrefix}-${i}` : '').join(' ')
  return classPrefix
}
const history = createBrowserHistory && createBrowserHistory();
const classPrefix = 'nav-bar'
const cx = classFix(classPrefix)

let outerSetTitle = (value: any ) => {}
Object.defineProperty(document, 'title', { // 响应式同步更改文档的title
  get: () => document.getElementsByTagName('title')[0].innerHTML,
  set: (value: any) => {
    outerSetTitle(value)
    document.getElementsByTagName('title')[0].innerHTML = value;
  }
})


type propsType = typeof defaultProps & {
  title: React.ReactNode | string,
  color: string,
  bgColor: string,
  customClass: string,
  customStyle: object,
  rightContent: React.ReactNode | string,
  closeWebFunc: Function,
  onBackClick: Function,
  children: React.ReactNode
}

// 自定义导航栏的组件，回退调用history的goback，若history.length为零，则调用bridge的关闭页面
const NavBar = memo(({ title, color, bgColor, customClass, rightContent, customStyle = {}, children, closeWebFunc, onBackClick }: propsType) => {
  const cs = customClass && classFix(customClass)
  const [newTitle, setTitle] = useState<any>('')
  document.body.style.overflow = 'hidden'
  useEffect(() => {
    setTimeout(() => {
      setTitle(title || document.title)
    }, 100);
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  outerSetTitle = value => setTitle(value || title || document.title)
  const handleBack = useCallback(() => {
    if (window.history.length === 1) {
      try {
        closeWebFunc() // 需要bridge实现功能
      } catch (e) {
        console.error('bridge关闭页面失败')
      }
    } else {
      onBackClick ? onBackClick()
       : history ? history.goBack() : window.history.back()
      // history.goBack()
    }
  }, [])
  return <div className={`${classPrefix} ${customClass}`}>
    <div className={`${cx('panel')} ${cs && cs('panel')}`} style={{ color, backgroundColor: bgColor, ...customStyle }}>
      <Icon size="md" type="left" className={cx('left')} onClick={() => handleBack()} />
      <div className={`${cx('title')} ${cs && cs('title')}`}>{newTitle}</div>
      <div className={`${cx('right')} ${cs && cs('right')}`}>{rightContent}</div>
    </div>
    <div className={`${cx('content')} ${cs && cs('content')}`}>{
      children
    }</div>
  </div>
})

// NavBar.propTypes = {
//   title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
//   color: PropTypes.string,
//   bgColor: PropTypes.string,
//   customClass: PropTypes.string,
//   customStyle: PropTypes.object,
//   rightContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
//   closeWebFunc: PropTypes.func, // 需要传入关闭H5的回调方法
//   onBackClick: PropTypes.func, // 自定义回退的方法
// }

const defaultProps = {
  color: '#000',
  bgColor: '#fff',
  customClass: '',
  rightContent: '',
  customStyle: {}
}

export default NavBar
