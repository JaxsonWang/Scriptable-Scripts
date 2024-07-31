import { createWidget } from '@/Demo/widget'

const widget = createWidget()

if (config.runsInWidget) {
  Script.setWidget(createWidget())
} else if (config.runsInApp) {
  await widget.presentMedium()
}

Script.complete()
