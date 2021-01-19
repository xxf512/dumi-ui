type imgOptions = {
  width?: number,
  height?: number
}

export interface propsType {
  // box: HTMLDivElement,
  // item: HTMLCanvasElement,
  percent?: number,
  targetPoint?: number,
  sAngle?: number,
  eAngle?: number,
  lineWidth?: number,
  minRadius?: number,
  mileagePoint?: number,
  coefficient?: number,
  isAnimation?: boolean,
  padding?: number,
  baseCircleColor?: string,
  progressCircleColor?: string,
  defaultColor?: string,
  activeColor?: string,
  defaultImg?: imgOptions,
  activeImg?: imgOptions,
}
