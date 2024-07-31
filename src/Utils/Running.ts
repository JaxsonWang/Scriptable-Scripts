import WebviewPage from './Webview'

export default async (Widget: any) => {
  // 桌面组件
  if (config.runsInWidget) {
    const widget = new Widget(args.widgetParameter ?? '')
    const render = await widget.render()

    const refresh = widget.settings['refreshAfterDate']
    if (refresh !== 0) render.refreshAfterDate = new Date(Date.now() + 1000 * 60 * refresh)

    Script.setWidget(render)
    Script.complete()
  }
  // Siri 内运行
  if (config.runsWithSiri) {
    const widget = new Widget()
    const data = await widget.siriShortcutData()
    Script.setShortcutOutput(data)
  }
  // App 内运行
  if (config.runsInApp) {
    const widget = new Widget()

    // 初始化
    const data = widget.settings['isBlockRequest'] ? {} : await widget.handleJoinerHttpData()

    const formItems = widget.actions
    const isUpdate = widget.isUpdate
    if (!isUpdate) await WebviewPage({ formItems, widget, isHome: true, info: data })
  }
}
