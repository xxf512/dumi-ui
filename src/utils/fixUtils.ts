import debounce from 'lodash/debounce';
// 解决IOS输入框失焦后，页面高度不恢复的问题，输入框失焦后调用
const _fixedInput = () => {
  let windowFocusHeight = window.innerHeight;
  let currentPosition;
  let speed = 1; // 页面滚动距离
  currentPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  currentPosition -= speed;
  window.scrollTo(0, currentPosition); // 页面向上滚动
  currentPosition += speed; // speed变量
  window.scrollTo(0, currentPosition); // 页面向下滚动
};

export const fixedInput = debounce(_fixedInput, 200);
