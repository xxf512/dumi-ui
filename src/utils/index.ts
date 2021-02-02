const reg = process.env.NODE_ENV === 'development' ? '/' : '/react/|/h5/|/'; // 避免本地缓存的命名空间混淆。开发者页面的文件夹不要以react或者h5开头
const pathKey = location.pathname
  .replace(/\/index.html$/, '')
  .replace(new RegExp(`^${reg}`), '');

/**
 * 类名命名,返回函数cx(),支持数组
 * @param {String} classPrefix  - className
 */
export const classFix = (classPrefix: string) => (
  className: Array<String> | String = '',
) => {
  if (typeof className === 'string')
    return classPrefix ? `${classPrefix}-${className}` : classPrefix;
  else if (Array.isArray(className) && className.length > 0)
    return className
      .map(i => (i || i === 0 ? `${classPrefix}-${i}` : ''))
      .join(' ');
  return classPrefix;
};

/**
 * 把数据保存到本地
 */
export const saveLocalData = (
  key?: string,
  item?: any,
  isSession?: boolean,
  nameSpace = true,
) => {
  const storage = isSession ? sessionStorage : localStorage;
  try {
    if (key === void 0) {
      const data = getLocalData();
      return Object.keys(data).forEach(item => {
        saveLocalData(item);
      });
    }
    if (item === void 0)
      storage.removeItem(nameSpace ? `_${pathKey}_${key}` : key);
    else
      storage.setItem(
        nameSpace ? `_${pathKey}_${key}` : key,
        JSON.stringify(item),
      );
  } catch (error) {
    console.error(error);
  }
};
/**
 * 读取本地数据, key若不传，得到本命名空间下存的所有本地数据
 */
export const getLocalData = (
  key?: string,
  isSession?: boolean,
  nameSpace = true,
) => {
  let res: any = null;
  try {
    if (key === void 0) {
      let allName = Object.keys(
        isSession ? sessionStorage : localStorage,
      ).filter(name => name.match(new RegExp(`^_${pathKey}_`)));
      if (allName.length > 0) {
        res = {};
        allName.forEach((item: any) => {
          let keyName = item.match(new RegExp(`^_${pathKey}_(.*)$`))[1];
          res[keyName] = getLocalData(keyName);
        });
      }
    } else
      res = JSON.parse(
        (isSession ? sessionStorage : localStorage).getItem(
          nameSpace ? `_${pathKey}_${key}` : key,
        ) || '',
      );
  } catch (error) {
    console.error(error);
  }
  return res;
};
