import { ScriptableJSX } from '@jag-k/scriptable-jsx'
import BaseText from '@/Components/BaseText'
import BaseWidget from './Components/BaseWidget'

export default async function (widgetData: OilPriceResponseData): Promise<ListWidget> {
  const type: WidgetFamilySize = 'medium'

  const { backgroundImage, backgroundGradient, imageTintColor } = await BaseWidget.bind(this)(type, widgetData)

  const handleNowStatus =
    widgetData.priceDirection === 'rising' ? `上涨    ` : widgetData.priceDirection === 'falling' ? `下跌    ` : `搁浅    `

  const forecastOilPrice = () => {
    const currentOilPrice = Number(widgetData[widgetData.forecastOilGrade].replace('¥', ''))
    let countCurrentOilPrice = 0
    switch (widgetData.priceDirection) {
      case 'rising':
        countCurrentOilPrice = currentOilPrice + Number(widgetData.forecastPrice)
        break
      case 'falling':
        countCurrentOilPrice = currentOilPrice - Number(widgetData.forecastPrice)
        break
      case 'stranded':
        countCurrentOilPrice = currentOilPrice
    }
    return (countCurrentOilPrice * Number(widgetData.forecastOilCapacity)).toFixed(2)
  }

  return (
    <widget backgroundImage={backgroundImage} backgroundGradient={backgroundGradient}>
      <stack>
        <stack align="center">
          <image
            data={SFSymbol.named(widgetData.oilIconType).image}
            size={new Size(widgetData.oilIconSize, widgetData.oilIconSize)}
            tintColor={imageTintColor}
          />
          <text
            {...BaseText({
              widgetData,
              size: 14,
              bold: true
            })}
          >
            {'中国油价 • ' + widgetData.region}
          </text>
        </stack>
        <spacer />
      </stack>
      <spacer />
      <stack>
        <spacer />
        <stack layout="vertical">
          <text
            {...BaseText({
              widgetData,
              color: new Color(widgetData.oilGradeColor),
              size: 26,
              bold: true
            })}
          >
            92#
          </text>
          <stack align="center">
            <text
              {...BaseText({
                widgetData,
                size: 16,
                bold: true
              })}
            >
              {widgetData.oil92}
            </text>
          </stack>
          <stack p-right={8} align="center">
            <text
              {...BaseText({
                widgetData,
                color:
                  widgetData.priceDirection === 'rising'
                    ? this.dangerColor()
                    : widgetData.priceDirection === 'falling'
                      ? this.successColor()
                      : this.warningColor(),
                size: 12,
                bold: true
              })}
            >
              {(widgetData.priceDirection === 'rising' ? '+' : widgetData.priceDirection === 'falling' ? '-' : '') +
                '' +
                widgetData.forecastPrice}
            </text>
          </stack>
        </stack>
        <spacer />
        <stack layout="vertical">
          <text
            {...BaseText({
              widgetData,
              color: new Color(widgetData.oilGradeColor),
              size: 26,
              bold: true
            })}
          >
            95#
          </text>
          <stack align="center">
            <text
              {...BaseText({
                widgetData,
                size: 16,
                bold: true
              })}
            >
              {widgetData.oil95}
            </text>
          </stack>
          <stack p-right={8} align="center">
            <text
              {...BaseText({
                widgetData,
                color:
                  widgetData.priceDirection === 'rising'
                    ? this.dangerColor()
                    : widgetData.priceDirection === 'falling'
                      ? this.successColor()
                      : this.warningColor(),
                size: 12,
                bold: true
              })}
            >
              {(widgetData.priceDirection === 'rising' ? '+' : widgetData.priceDirection === 'falling' ? '-' : '') +
                '' +
                widgetData.forecastPrice}
            </text>
          </stack>
        </stack>
        <spacer />
        <stack layout="vertical">
          <text
            {...BaseText({
              widgetData,
              color: new Color(widgetData.oilGradeColor),
              size: 26,
              bold: true
            })}
          >
            98#
          </text>
          <stack align="center">
            <text
              {...BaseText({
                widgetData,
                size: 16,
                bold: true
              })}
            >
              {widgetData.oil98}
            </text>
          </stack>
          <stack p-right={8} align="center">
            <text
              {...BaseText({
                widgetData,
                color:
                  widgetData.priceDirection === 'rising'
                    ? this.dangerColor()
                    : widgetData.priceDirection === 'falling'
                      ? this.successColor()
                      : this.warningColor(),
                size: 12,
                bold: true
              })}
            >
              {(widgetData.priceDirection === 'rising' ? '+' : widgetData.priceDirection === 'falling' ? '-' : '') +
                '' +
                widgetData.forecastPrice}
            </text>
          </stack>
        </stack>
        <spacer />
        <stack layout="vertical">
          <stack>
            <text
              {...BaseText({
                widgetData,
                color: new Color(widgetData.oilGradeColor),
                size: 26,
                bold: true
              })}
            >
              0#
            </text>
          </stack>
          <stack align="center">
            <text
              {...BaseText({
                widgetData,
                size: 16,
                bold: true
              })}
            >
              {widgetData.oil0}
            </text>
          </stack>
          <stack p-right={8} align="center">
            <text
              {...BaseText({
                widgetData,
                color:
                  widgetData.priceDirection === 'rising'
                    ? this.dangerColor()
                    : widgetData.priceDirection === 'falling'
                      ? this.successColor()
                      : this.warningColor(),
                size: 12,
                bold: true
              })}
            >
              {(widgetData.priceDirection === 'rising' ? '+' : widgetData.priceDirection === 'falling' ? '-' : '') +
                '' +
                widgetData.forecastPrice}
            </text>
          </stack>
        </stack>
        <spacer />
      </stack>
      <spacer />
      <stack>
        <spacer />
        <text
          {...BaseText({
            widgetData,
            size: 10
          })}
        >
          {`预计加满 ${widgetData.forecastOilGrade.replace('oil', '')} 号汽油 ${widgetData.forecastOilCapacity} 升需要 ${forecastOilPrice()} 元`}
        </text>
        <spacer />
      </stack>
      <stack>
        <spacer />
        <text
          {...BaseText({
            widgetData,
            size: 10
          })}
        >
          {`${widgetData.startDate}刷新 • ${widgetData.forecastDate + handleNowStatus}`}
        </text>
        <spacer />
      </stack>
    </widget>
  )
}
