/**
 * 创建画布
 * @param width
 * @param height
 */
export const createACanvas = (width: number, height: number) => {
  const canvas = new DrawContext()
  canvas.opaque = false
  canvas.respectScreenScale = true
  canvas.size = new Size(width, height)
  return canvas
}

/**
 * 将图像裁剪到指定的 rect 中
 * @param img
 * @param rect
 * @returns {Image}
 */
export const cropImage = (img: Image, rect: Rect): Image => {
  const draw = new DrawContext()
  draw.size = new Size(rect.width, rect.height)

  draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y))
  return draw.getImage()
}

/**
 * 绘制路线
 * @param canvas
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param width
 * @param color
 */
export const drawLine = (canvas: DrawContext, x1: number, y1: number, x2: number, y2: number, width: number, color: Color) => {
  const path = new Path()
  path.move(new Point(Math.round(x1), Math.round(y1)))
  path.addLine(new Point(Math.round(x2), Math.round(y2)))
  canvas.addPath(path)
  canvas.setStrokeColor(color)
  canvas.setLineWidth(width)
  canvas.strokePath()
}

/**
 * 绘制文字
 * @param canvas
 * @param x
 * @param y
 * @param width
 * @param height
 * @param text
 * @param fontType
 * @param fontSize
 * @param alignment
 * @param color
 */
export const drawText = (
  canvas: DrawContext,
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  fontType: string,
  fontSize: number,
  alignment: 'left' | 'center' | 'right',
  color: Color
) => {
  canvas.setFont(new Font(fontType, fontSize))
  canvas.setTextColor(color)
  if (alignment == 'left') {
    canvas.setTextAlignedLeft()
  }
  if (alignment == 'center') {
    canvas.setTextAlignedCenter()
  }
  if (alignment == 'right') {
    canvas.setTextAlignedRight()
  }
  canvas.drawTextInRect(`${text}`, new Rect(x, y, width, height))
}

/**
 * 绘制实心柱子
 * @param canvas
 * @param x
 * @param y
 * @param width
 * @param height
 * @param cornerstone
 * @param color
 */
export const fillRect = (
  canvas: DrawContext,
  x: number,
  y: number,
  width: number,
  height: number,
  cornerstone: number,
  color: Color
) => {
  const path = new Path()
  const rect = new Rect(x, y, width, height)
  path.addRoundedRect(rect, cornerstone, cornerstone)
  canvas.addPath(path)
  canvas.setFillColor(color)
  canvas.fillPath()
}

/**
 * 绘制实心圆形
 * @param canvas
 * @param x1
 * @param y1
 * @param diffPoint
 * @param color
 */
export const drawPoint = (canvas: DrawContext, x1: number, y1: number, diffPoint: number, color: Color) => {
  const currPath = new Path()
  currPath.addEllipse(new Rect(x1, y1, diffPoint, diffPoint))
  canvas.addPath(currPath)
  canvas.setFillColor(color)
  canvas.fillPath()
}

/**
 * 绘制环形进度条
 * @param canvas
 * @param opts
 * @param fillColor
 * @param strokeColor
 * @param strokeOpacity
 */
export const drawCircle = (canvas: DrawContext, opts: any, fillColor: string, strokeColor: string, strokeOpacity: number = 0.2) => {
  const { size, radius, width, percent } = opts

  const ctr = new Point(size / 2, size / 2)
  const bgx = ctr.x - radius
  const bgy = ctr.y - radius
  const bgd = 2 * radius
  const bgr = new Rect(bgx, bgy, bgd, bgd)

  canvas.setStrokeColor(new Color(strokeColor, strokeOpacity))
  canvas.setLineWidth(width)
  canvas.strokeEllipse(bgr)

  for (let t = 0; t < percent * 3.6; t++) {
    const rect_x = ctr.x + radius * Math.sin((t * Math.PI) / 180) - width / 2
    const rect_y = ctr.y - radius * Math.cos((t * Math.PI) / 180) - width / 2
    const rect_r = new Rect(rect_x, rect_y, width, width)
    canvas.setFillColor(new Color(fillColor))
    canvas.setStrokeColor(new Color(strokeColor))
    canvas.fillEllipse(rect_r)
  }
}

/**
 * 给图片加一层半透明遮罩
 * @param image
 * @param color
 * @param opacity
 */
export const shadowImage = (image: Image, color: string = '#000000', opacity: number = 0.7): Image => {
  const ctx = new DrawContext()
  // 获取图片的尺寸
  ctx.size = image.size
  ctx.drawImageInRect(image, new Rect(0, 0, image.size['width'], image.size['height']))
  ctx.setFillColor(new Color(color, opacity))
  ctx.fillRect(new Rect(0, 0, image.size['width'], image.size['height']))
  return ctx.getImage()
}
