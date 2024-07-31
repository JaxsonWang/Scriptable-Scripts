import OilPrice from '@/OilPrice/OilPrice'
import Running from '@/Utils/Running'
import { donationSupport } from '@/Utils'

class Widget extends OilPrice {
  constructor(args: any) {
    super(args)

    this.run()
  }

  run() {
    this.actions = [
      {
        name: 'baseConfig',
        label: '基础设置',
        type: 'cell'
      },
      {
        name: 'componentsConfig',
        label: '组件设置',
        type: 'cell'
      },
      {
        name: 'checkUpdate',
        label: '检查更新',
        type: 'cell'
      },
      {
        name: 'donationInSupport',
        label: '捐赠支持',
        type: 'cell'
      }
    ]
  }

  /**
   * 捐赠支持
   */
  async donationInSupport() {
    donationSupport()
  }
}

await Running(Widget)
