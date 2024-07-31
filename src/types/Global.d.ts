type WidgetFamilySize = 'small' | 'medium' | 'large'

interface BaseWidgetData {
  showBackgroundImage?: boolean
  bgColorInLight?: string[]
  bgColorInDark?: string[]
  bgColorGradient?: string
  fontFamilyInRegular?: string
  fontFamilyInBold?: string
  textColorInLight?: string
  textSizeGlobal?: string
  textColorInDark?: string
  showTextShadow?: boolean
  textShadowColorInLight?: string
  textShadowColorInDark?: string
}

interface SettingsForOptions {
  label: string
  name?: string
  value: any
}

interface BaseWidgetPublicData {
  backgroundImage: Image,
  backgroundGradient: LinearGradient,
  imageTintColor: Color
}
