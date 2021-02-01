/**
 * 类名命名,返回函数cx(),支持数组
 * @param {String} classPrefix  - className
 */
export const classFix = (classPrefix: string) => (className: Array<String> | String = '') => {
  if (typeof className === 'string') return classPrefix ? `${classPrefix}-${className}` : classPrefix
  else if (Array.isArray(className) && className.length > 0) return className.map(i => (i || i === 0) ? `${classPrefix}-${i}` : '').join(' ')
  return classPrefix
}
