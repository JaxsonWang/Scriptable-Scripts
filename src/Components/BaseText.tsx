/**
 * 文本组件
 * @param prop
 * @constructor
 */
const BaseText = (prop: any): any => {
  const { widgetData, size, bold, color } = prop

  // 自定义字体大小，默认为 100%
  const textSizeGlobal = widgetData.textSizeGlobal || '100'
  const textSize = (parseInt(textSizeGlobal, 10) / 100) * size

  let textFont = new Font(widgetData.fontFamilyInRegular, textSize)
  if (bold) textFont = new Font(widgetData.fontFamilyInBold, textSize)

  const textColor =
    color ?? Color.dynamic(new Color(widgetData.textColorInLight), new Color(widgetData.textColorInDark))

  const shadowColor = Color.dynamic(
    new Color(widgetData.textShadowColorInLight),
    new Color(widgetData.textShadowColorInDark)
  )

  const shadowRadius = widgetData.showTextShadow ? (textSize / 20 === 1 ? 1 : 1 - textSize / 20) : 0
  const shadowOffset = new Point(textSize / 20, textSize / 20)

  return {
    font: textFont,
    color: textColor,
    shadowColor: shadowColor,
    shadowRadius: shadowRadius,
    shadowOffset: shadowOffset
  }
  // return (
  //   <text
  //     font={textFont}
  //     color={textColor}
  //     shadowColor={shadowColor}
  //     shadowRadius={shadowRadius}
  //     shadowOffset={shadowOffset}
  //     {...otherProps}
  //   >
  //     {children}
  //   </text>
  // )
}

export default BaseText
