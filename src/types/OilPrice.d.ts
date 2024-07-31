interface OilPriceResponseData extends BaseWidgetData {
  region: string
  oil92: number
  oil95: number
  oil98: number
  oil0: number
  forecastPrice: '0'
  priceDirection: 'rising' | 'falling' | 'stranded'
  startDate: string
  forecastDate: string
  oilGradeColor?: string
  oilIconType?: string
  oilIconSize?: number
}
