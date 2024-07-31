/**
 * 压缩图片
 * @param image
 */
export const compressionImage = (image: Image) => {
  let { width, height } = image.size
  const multiple = width / height
  if (width > height) {
    width = 600
    height = width / multiple
  } else {
    height = 600
    width = height * multiple
  }
  const ctx = new DrawContext()
  ctx.opaque = false
  ctx.size = new Size(width, height)
  ctx.drawImageInRect(image, new Rect(0, 0, width, height))
  return ctx.getImage()
}
