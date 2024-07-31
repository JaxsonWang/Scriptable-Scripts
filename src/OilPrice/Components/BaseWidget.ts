enum WidgetFamily {
  small = 'Small',
  medium = 'Medium',
  large = 'Large'
}

export default async function (widgetFamilySize: WidgetFamilySize, widgetData: BaseWidgetData): Promise<BaseWidgetPublicData> {
  // 图片背景，另外需要在 args.widgetParameter 判断
  const widgetParameter = args.widgetParameter || ''

  let backgroundImage = null
  let backgroundGradient = null

  // 图片背景
  if (widgetData.showBackgroundImage && !/noBgImg/.test(widgetParameter)) {
    const widgetFamily = WidgetFamily[widgetFamilySize]
    backgroundImage = this.getCacheImage(`backgroundImage${widgetFamily}`)
  }

  // 颜色背景
  if (!widgetData.showBackgroundImage) {
    const bgColor = new LinearGradient()
    const lightBgColors = widgetData.bgColorInLight
    const darkBgColors = widgetData.bgColorInDark
    const colorArr = []
    ;(lightBgColors.length >= darkBgColors.length ? lightBgColors : darkBgColors).forEach((_color, index) => {
      const dynamicColor = Color.dynamic(
        new Color(lightBgColors[index] ?? '#ffffff', 1),
        new Color(darkBgColors[index] ?? '#000000', 1)
      )
      colorArr.push(dynamicColor)
    })
    bgColor.colors = colorArr
    bgColor.locations = widgetData.bgColorGradient.split(',').map(i => parseFloat(i))
    backgroundGradient = bgColor
  }

  const imageTintColor = Color.dynamic(new Color(widgetData.textColorInLight), new Color(widgetData.textColorInDark))

  return {
    backgroundImage,
    backgroundGradient,
    imageTintColor
  }
}
