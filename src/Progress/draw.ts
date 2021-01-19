import { propsType } from './type'

const calcPIToAngle = (PI: number) => PI / 2 * 360; // 根据PI计算圆的角度
const calcAngleToPI = (angle: number) => angle / 360 * 2; // 根据角度计算PI
const isImageSrc = (src: string) => /.(jpeg|gif|jpg|png)$/.test(src);
const imgOptions = {
  width: 50, // 图片宽
  height: 50 // 图片高
};
const DEFAULT_IMG = 'defaultImg';
const ACTIVE_IMG = 'activeImg';
export default class DrawProcess {

  readonly canvasParent: HTMLElement
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  private state: any

  constructor(props: any) {
    const {
      box,
      item,
      percent = 0, // 进度百分比
      targetPoint = 0, // 自定义中位点
      sAngle = 198, // 开始角度
      eAngle = 342, // 结束角度
      lineWidth = 25, // 线宽
      minRadius = 50, // 小圆半径
      mileagePoint = 3, // 里程点
      coefficient = 2, // 系数越大，canvas绘制的越小，反之越小绘制的越大，固定值
      isAnimation = false, // 是否启用动画，启用动画只支持纯色里程点，不支持图片里程点，原因是canvas绘制层级的关系，最后一次绘制的层级是最高的，动画绘制会导致图片在进度圆下面
      padding = 0, // 内边距
      baseCircleColor = 'rgba(255,255,255,1)', // 底圆
      progressCircleColor = '#FFD300', // 进度圆
      defaultColor = 'rgba(255,255,255,1)', // 默认点
      activeColor = '#FFD300', // 激活点
      defaultImg = imgOptions,
      activeImg = imgOptions // 图片默认宽高
    } = props;
    this.canvasParent = box;
    this.canvas = item;
    const res = item.getContext('2d');
    if (!(res instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2D context');
    }
    // 确保res不为空 ts才不会报错
    this.ctx = res
    const startPI = calcAngleToPI(sAngle); // 起始Pi
    const endPI = calcAngleToPI(eAngle); // 结束Pi
    const intervalPI = ((endPI * 10) - (startPI * 10)) / 10; // 区间Pi
    const dataProgress = percent >= 100 ? 100 : percent;// 进度值百分比
    const currentPI = startPI + (dataProgress / 100 * intervalPI); // 当前进度条角度

    // 计算需要激活的里程点值 [0, 40, 80]
    const points = [];
    for (let i = 0; i < mileagePoint; i++) {
      points.push(Math.ceil(intervalPI * 100 / (mileagePoint - 1) * i))
    }
    // 默认指定某个位置设置中位点
    const targetPI = startPI + (targetPoint / 100 * intervalPI);
    if (targetPoint) {
      points.splice(1, 1, targetPoint * intervalPI); // 把目标点替换均匀分布的中位点
    }

    this.state = {
      isAnimation, // 是否动画
      coefficient, // 系数
      dataProgress, // 进度值百分比
      startPI, // 起始Pi
      endPI, // 结束Pi
      intervalPI, // 区间Pi 0.8
      currentPI, // 当前进度条角度
      mileagePoint, // 里程点
      arcData: {}, // 进度圆坐标
      lineWidth, // 线宽
      minRadius, // 小圆半径
      baseCircleColor, // 底圆
      progressCircleColor, // 进度圆
      defaultColor, // 默认点
      activeColor, // 激活点
      animationFrameID: '', // 动画id
      startAngle: startPI * Math.PI, // 开始角度
      endAngle: endPI * Math.PI, // 结束角度
      points, // 计算需要激活的里程点值
      targetPI, // 指定某个位置设置中位点
      defaultImg, // 默认图片宽高
      activeImg, // 激活图片默认宽高
      padding, // 绘制圆的内边距, 值越大绘制越小
    };
    this.initCanvas()
  }

  // 设置属性
  setState(data: object) {
    const { state } = this;
    this.state = { ...state, ...data };
  }

  // 通过指定的value值返回PI
  getTargetValuePI = (value = 0) => {
    const { startPI, intervalPI } = this.state;
    return startPI + (value / 100 * intervalPI)
  };

  initAnimation = (s = 0) => {
    const { progressCircleColor, startPI, currentPI, startAngle, points } = this.state;
    const currentValue = (currentPI - startPI) * 100;

    if (s <= currentValue) {
      const progressValue = ((startPI * 100) + s) / 100;
      this.drawPen(progressCircleColor, startAngle, progressValue * Math.PI);
      if (points.includes(s)) {
        this.drawActiveTargetPointCircle(s); // 绘制激活的里程点
      }
      const animationFrameID = requestAnimationFrame(() => this.initAnimation(s));
      this.setState({ animationFrameID })
    } else {
      const { animationFrameID } = this.state;
      cancelAnimationFrame(animationFrameID)
    }
    s++;
  };

  // 初始化
  initCanvas() {
    const { canvasParent, canvas, ctx } = this;
    const { coefficient, targetPI, currentPI, baseCircleColor, progressCircleColor, startAngle, endAngle, isAnimation, lineWidth, minRadius, defaultColor, activeColor, padding } = this.state;
    const { clientHeight: canvasHeight, clientWidth: canvasWidth } = canvasParent;

    canvas.width = canvasWidth * coefficient;
    canvas.height = canvasHeight * coefficient;
    // canvas.style.width为canvas.width的一半用于避免绘制后出现模糊不清晰
    canvas.style.width = canvas.width / coefficient + 'px';
    canvas.style.height = canvas.height / coefficient + 'px';

    const calcLineWidth = canvas.width / coefficient / lineWidth;// 绘制圆弧线宽
    const calcMinRadius = canvas.width / coefficient / minRadius; // 小圆半径
    const arcData = {
      x: canvas.width / coefficient,
      y: canvas.height / coefficient,
      r: (canvas.width - (calcLineWidth) - (calcMinRadius * coefficient)) / coefficient - padding// 减线宽和小圆半径控制绘制的圆弧与canvas的边界贴合，防止出现canvas边界出现模糊
    };

    // 判断传入的颜色是不是图片
    const drawImgList = [];
    const isDefaultImg = isImageSrc(defaultColor);
    const isActiveImg = isImageSrc(activeColor);
    if (isDefaultImg) {
      drawImgList.push({ type: DEFAULT_IMG, src: defaultColor })
    }
    if (isActiveImg) {
      drawImgList.push({ type: ACTIVE_IMG, src: activeColor })
    }

    this.setState({ arcData, lineWidth: calcLineWidth, minRadius: calcMinRadius, drawImgList });
    ctx.lineCap = 'round';
    ctx.lineWidth = calcLineWidth;
    // 绘制底圆
    this.drawPen(baseCircleColor, startAngle, endAngle);
    if (isAnimation && (!isDefaultImg || !isActiveImg)) {
      this.drawTargetPointCircle(false); // 绘制基础进度圆
      this.initAnimation(); // 执行动画
    } else {
      // 绘制进度圆
      this.drawPen(progressCircleColor, startAngle, currentPI * Math.PI);
      // 绘制进度圆点(如果中位里程点存在)
      if (targetPI) {
        this.drawTargetPointCircle()
      } else {
        this.drawProgressCircle()
      }
    }
  }

  // 通过角度获取计算坐标系
  getCalculateCoordinateSystem(angle: number) {
    const { arcData } = this.state;
    const calculate = Math.PI * 2 / 360 * angle;
    const x = arcData.x + Math.cos(calculate) * arcData.r; // 获取圆边长上的x坐标
    const y = arcData.y + Math.sin(calculate) * arcData.r; // 获取圆边长上的y坐标
    return { x, y }
  }

  // 绘制激活里程点
  drawActiveTargetPointCircle(value: number) {
    const { minRadius, activeColor, intervalPI } = this.state;
    const v = value / intervalPI; // 转换成传入的值targetPoint
    const valuePI = this.getTargetValuePI(v);
    const angle = calcPIToAngle(valuePI);
    const { x, y } = this.getCalculateCoordinateSystem(angle);
    this.drawPath({ x, y, r: minRadius, color: activeColor }); // 绘制
  }

  // 绘制指定里程点
  drawTargetPointCircle(flag = true) {
    const { currentPI, startPI, endPI, targetPI, minRadius, mileagePoint, defaultColor, activeColor, points } = this.state;
    const arrPI = [ startPI, targetPI, endPI ]; // 里程点PI值
    for (let i = 0; i < mileagePoint; i++) {
      const { x, y, angle } = this.calculateFrameOfReference(arrPI[i]);
      let color = defaultColor; // 根据是否达到里程点设置激活点
      if (flag) {
        const currentAngle = calcPIToAngle(currentPI); // 计算当前进度值角度是否达到里程点
        color = currentAngle >= angle ? activeColor : defaultColor
      }
      this.drawPath({ x, y, r: minRadius, color }); // 绘制
    }
  }

  // 计算绘制所需要的坐标
  calculateFrameOfReference(PI: number) {
    const angle = calcPIToAngle(PI); // 指定PI里程点
    const { x, y } = this.getCalculateCoordinateSystem(angle);
    return { x, y, angle }
  }

  // 绘制进度圆点
  drawProgressCircle() {
    const { startPI, currentPI, intervalPI, minRadius, defaultColor, activeColor, mileagePoint } = this.state;
    for (let i = 0; i < mileagePoint; i++) {
      const angle = calcPIToAngle(startPI + ((intervalPI / (mileagePoint - 1)) * i)); // 根据开始PI值计算均匀分布的里程点
      const { x, y } = this.getCalculateCoordinateSystem(angle);
      const currentAngle = calcPIToAngle(currentPI); // 计算当前进度值角度是否达到里程点
      const color = currentAngle >= angle ? activeColor : defaultColor; // 根据是否达到里程点设置激活点
      this.drawPath({ x, y, r: minRadius, color }); // 绘制
    }
  }

  // 绘制画笔
  drawPen(color: string, startAngle: number, endAngle: number) {
    const { arcData: { x, y, r } } = this.state;
    this.drawPath({ x, y, r, color, startAngle, endAngle })
  }
  // 绘制圆
  async drawPath({ x, y, r, color, startAngle = (0), endAngle = (2 * Math.PI) }: any) {
    const { ctx } = this;
    ctx.beginPath();
    if (isImageSrc(color)) {
      await this.drawImg(x, y, color)
    } else {
      ctx.arc(x, y, r, startAngle, endAngle, false);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
    ctx.closePath();
  }

  // 绘制图片
  drawImg(x: any, y: any, color: string) {
    // console.log(x, y)
    const { ctx } = this;
    const { drawImgList } = this.state;
    const state = this.state;
    return new Promise((resolve, reject): void => {
      const img = new Image();
      img.src = color;
      img.onload = function () {
        const { width, height } = img;
        const { type } = drawImgList.find((x: any) => x.src === color) || {};
        const { width: imgWidth, height: imgHeight } = state[type];
        // console.log(type, width, height)

        ctx.drawImage(img, 0, 0, width, height, x - (imgWidth / 2), y - (imgHeight / 2), imgWidth, imgHeight);
        resolve('')
      };
      img.onerror = reject
    })
  }
}
