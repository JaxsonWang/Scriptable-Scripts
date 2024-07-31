import { SecondaryBackgroundColor, SmallFont, TITLE_TEXT, TitleFont } from './constants'
import { ScriptableJSX } from '@jag-k/scriptable-jsx'

// =========================================
// Widgets
// =========================================
export function createWidget(): ListWidget {
  const now = new Date()
  return (
    <widget p-all={15}>
      <text font={TitleFont} align={'center'}>
        {TITLE_TEXT}
      </text>
      <spacer />
      <stack cornerRadius={15} p-all={10} backgroundColor={SecondaryBackgroundColor}>
        <spacer />
        This is a widget created with JSX using @jag-k/scriptable-jsx.
        <spacer />
      </stack>
      <spacer />
      <stack align={'bottom'}>
        <text color={Color.gray()} font={SmallFont}>
          Widget updated at:
        </text>
        <spacer />
        <text color={Color.blue()} font={SmallFont}>
          {now.toLocaleString()}
        </text>
      </stack>
    </widget>
  )
}
