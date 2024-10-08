import BaseText from '@/Components/BaseText'
import { ScriptableJSX } from '@jag-k/scriptable-jsx'

export default async function (widgetData: OilPriceResponseData): Promise<ListWidget> {
  return (
    <widget>
      <stack layout="vertical">
        <text
          {...BaseText({
            widgetData,
            size: 12,
            bold: true
          })}
        >
          不支持大组件，请使用小和中号规格组件
        </text>
      </stack>
    </widget>
  )
}
