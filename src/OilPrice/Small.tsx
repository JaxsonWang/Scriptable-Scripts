import { ScriptableJSX } from '@jag-k/scriptable-jsx'
import BaseWidget from './Components/BaseWidget'
import BaseText from '@/Components/BaseText'

export default async function (widgetData: OilPriceResponseData): Promise<ListWidget> {
  const type: WidgetFamilySize = 'small'

  const { backgroundImage, backgroundGradient, imageTintColor } = await BaseWidget.bind(this)(type, widgetData)

  return (
    <widget backgroundImage={backgroundImage} backgroundGradient={backgroundGradient}>
      <stack layout={'vertical'}>
        <stack>
          <stack align={'center'}>
            <image
              data={SFSymbol.named(widgetData.oilIconType).image}
              size={new Size(widgetData.oilIconSize - 4, widgetData.oilIconSize - 4)}
              tintColor={imageTintColor}
            />
            <text
              {...BaseText({
                widgetData,
                size: 12,
                bold: true
              })}
            >
              {'中国油价 • ' + widgetData.region}
            </text>
          </stack>
          <spacer />
        </stack>
        <spacer />
        <stack layout={'vertical'}>
          <stack align={'bottom'}>
            <text
              {...BaseText({
                widgetData,
                size: 14,
                bold: true,
                color: new Color(widgetData.oilGradeColor)
              })}
            >
              92#
            </text>
            <stack p-right={10} align={'center'}>
              <text
                {...BaseText({
                  widgetData,
                  size: 14,
                  bold: true
                })}
              >
                {widgetData.oil92}
              </text>
            </stack>
          </stack>
          <stack align={'bottom'}>
            <text
              {...BaseText({
                widgetData,
                size: 14,
                bold: true,
                color: new Color(widgetData.oilGradeColor)
              })}
            >
              95#
            </text>
            <stack p-right={10} align={'center'}>
              <text
                {...BaseText({
                  widgetData,
                  size: 14,
                  bold: true
                })}
              >
                {widgetData.oil95}
              </text>
            </stack>
          </stack>
          <stack align={'bottom'}>
            <text
              {...BaseText({
                widgetData,
                size: 14,
                bold: true,
                color: new Color(widgetData.oilGradeColor)
              })}
            >
              98#
            </text>
            <stack p-right={10} align={'center'}>
              <text
                {...BaseText({
                  widgetData,
                  size: 14,
                  bold: true
                })}
              >
                {widgetData.oil98}
              </text>
            </stack>
          </stack>
          <stack align={'bottom'}>
            <text
              {...BaseText({
                widgetData,
                size: 14,
                bold: true,
                color: new Color(widgetData.oilGradeColor)
              })}
            >
              0#
            </text>
            <stack p-right={20} align={'center'}>
              <text
                {...BaseText({
                  widgetData,
                  size: 14,
                  bold: true
                })}
              >
                {widgetData.oil0}
              </text>
            </stack>
          </stack>
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
            {`${widgetData.startDate}刷新`}
          </text>
          <spacer />
        </stack>
      </stack>
    </widget>
  )
}
