import Core from '@/Base/Core'
import { cropImage } from '@/Utils/Canvs'
import PhoneSizes from '@/Utils/PhoneSizes'
import { compressionImage } from '@/Utils/Image'
import WebviewPage from '@/Utils/Webview'

class UIRender extends Core {
  constructor(args = '') {
    super(args)
  }

  /**
   * 基础设置
   */
  async baseConfig() {
    await WebviewPage({
      formItems: [
        {
          name: 'handleReset',
          label: '重置组件',
          type: 'cell',
          tip: '如账号数据有问题，可尝试此操作！'
        },
        {
          name: 'handleRestore',
          label: '还原参数',
          type: 'cell',
          tip: '如需要恢复默认参数，可尝试此操作，本操作不会清除账号信息！'
        },
        {
          name: 'refreshAfterDate',
          label: '刷新时间',
          type: 'number',
          default: this.settings['refreshAfterDate'],
          tip: '刷新时间仅供参考，具体刷新时间由系统判断，单位：分钟'
        },
        {
          name: 'handleFontStyles',
          label: '字体样式',
          type: 'cell'
        },
        {
          name: 'handleBackgroundStyles',
          label: '背景设置',
          type: 'cell'
        },
        {
          name: 'getErrorLog',
          label: '日志中心',
          type: 'cell'
        }
      ],
      title: '基础设置',
      widget: this
    })
  }

  /**
   * 账户登出
   */
  async handleLogout() {
    const id = await this.generateAlert('操作提醒', '是否要切换/登出当前组件账户吗？此操作不会删除设置信息。', ['确定'], '取消')
    if (id !== -1) {
      this.settings['isLogin'] = false
      await this.saveSettings(false)
      await this.notify('切换登出成功', '请重新运行此桌面小组件！')
      this.rerunWidget()
    }
  }

  /**
   * 重置组件
   */
  async handleReset() {
    const id = await this.generateAlert(
      '操作提醒',
      '是否要重置当前组件吗？此操作会删除设置信息，请注意是否继续操作。',
      ['确定'],
      '取消'
    )
    if (id !== -1) {
      this.handleResetPlugin()
      await this.notify('重置组件成功', '请重新运行此桌面小组件！')
      this.rerunWidget()
    }
  }

  /**
   * 还原参数
   */
  async handleRestore() {
    const id = await this.generateAlert(
      '操作提醒',
      '是否要还原当前组件参数吗？此操作会还原设置信息，请注意是否继续操作。',
      ['确定'],
      '取消'
    )
    if (id !== -1) {
      const coreKeys = this.getSettingsDefaultCoreKeys()
      for (const coreKey in coreKeys) {
        this.settings[coreKey] = coreKeys[coreKey]
      }

      const pluginKeys = this.getSettingsDefaultPluginKeys()
      for (const pluginKey in pluginKeys) {
        this.settings[pluginKey] = pluginKeys[pluginKey]
      }

      await this.saveSettings(false)

      await this.notify('还原参数成功', '请重新运行此桌面小组件！')
      this.rerunWidget()
    }
  }

  /**
   * 字体样式
   */
  async handleFontStyles() {
    await WebviewPage({
      formItems: [
        {
          name: 'textSizeGlobal',
          label: '全局字体大小',
          type: 'range',
          default: this.settings['textSizeGlobal'],
          tip: '如果小组件出现省略号问题，请适当减小字体大小，默认为 100% 系统字体大小。'
        },
        {
          name: 'textColorInLight',
          label: '字体颜色 - 白天',
          type: 'color',
          default: this.settings['textColorInLight']
        },
        {
          name: 'textColorInDark',
          label: '字体颜色 - 夜间',
          type: 'color',
          default: this.settings['textColorInDark']
        },
        {
          name: 'showTextShadow',
          label: '字体阴影',
          type: 'switch',
          default: this.settings['showTextShadow']
        },
        {
          name: 'textShadowColorInLight',
          label: '字体阴影 - 白天',
          type: 'color',
          default: this.settings['textShadowColorInLight']
        },
        {
          name: 'textShadowColorInDark',
          label: '字体阴影 - 夜间',
          type: 'color',
          default: this.settings['textShadowColorInDark']
        },
        {
          name: 'fontFamilyInRegular',
          label: '字体风格 - 常规字体',
          type: 'textarea',
          rows: 1,
          default: this.settings['fontFamilyInRegular'],
          tip: `请访问 <a href="javascript:invoke('safari','https://developer.apple.com/fonts/system-fonts/');" class="text-danger">Apple Developer</a> 选择您喜欢的字体风格`
        },
        {
          name: 'fontFamilyInBold',
          label: '字体风格 - 粗体',
          type: 'textarea',
          rows: 1,
          default: this.settings['fontFamilyInBold'],
          tip: `请访问 <a href="javascript:invoke('safari','https://developer.apple.com/fonts/system-fonts/');" class="text-danger">Apple Developer</a> 选择您喜欢的字体风格`
        }
      ],
      title: '字体样式',
      widget: this
    })
  }

  /**
   * 背景设置
   */
  async handleBackgroundStyles() {
    await WebviewPage({
      formItems: [
        {
          name: 'bgColorInLight',
          label: '颜色背景 - 白天',
          type: 'colors',
          default: this.settings['bgColorInLight']
        },
        {
          name: 'bgColorInDark',
          label: '颜色背景 - 夜间',
          type: 'colors',
          default: this.settings['bgColorInDark'],
          tip: '如果白天设置三种颜色，那么夜间也必须是三种颜色，颜色数量必须相同。'
        },
        {
          name: 'bgColorGradient',
          label: '颜色背景 - 渐变角度',
          type: 'text',
          default: this.settings['bgColorGradient'],
          tip: '调整渐变位置颜色，例如你可以设置这样「0,0.6,1.0」'
        },
        {
          name: 'showBackgroundImage',
          label: '图片背景',
          type: 'switch',
          default: this.settings['showBackgroundImage'],
          tip: '关闭显示颜色背景，开启显示图片背景或透明背景。<br />开启之前请先设置背景图片。'
        },
        {
          name: 'setBackgroundCustomImage',
          label: '自选图片',
          type: 'cell'
        },
        {
          name: 'setBackgroundTransparentImage',
          label: '透明背景 - 剪裁图片',
          type: 'cell'
        }
      ],
      title: '背景设置',
      widget: this
    })
  }

  /**
   * 自选图片
   * @returns {Promise<void>}
   */
  async setBackgroundCustomImage(): Promise<void> {
    try {
      const message = '您创建组件的是什么规格？'
      const sizes = ['小组件', '中组件', '大组件']
      const _sizes = ['Small', 'Medium', 'Large']
      const size = await this.generateAlert('提示', message, sizes, '取消')
      if (size === -1) return
      const widgetSize = _sizes[size]

      const image = await Photos.fromLibrary()
      const imageType = 'backgroundImage' + widgetSize
      const img = compressionImage(image)
      this.setCacheImage(imageType, img)

      this.settings[imageType] = imageType
      await this.saveSettings()
    } catch (error) {
      // 取消图片会异常 暂时不用管
    }
  }

  /**
   * 透明（剪裁）壁纸
   * @returns {Promise<void>}
   */
  async setBackgroundTransparentImage(): Promise<void> {
    let message = '开始之前，请转到主屏幕并进入桌面编辑模式，滚动到最右边的空页面，然后截图！'
    const exitOptions = ['前去截图', '继续']
    const shouldExit = await this.generateAlert('提示', message, exitOptions)
    if (!shouldExit) return

    // Get screenshot and determine phone size.
    try {
      const wallpaper = await Photos.fromLibrary()
      const height = wallpaper.size.height
      let suffix = ''

      if (height === 2436) {
        message = '请选择您的 iPhone 型号'
        const options = ['iPhone 12 mini', 'iPhone 11 Pro, iPhone XS, 或者 iPhone X']
        const result = await this.generateAlert('Joiner 提示', message, options)
        if (result === 0) {
          suffix = '_mini'
        }
      }

      const phone = PhoneSizes[height + suffix]
      if (!phone) {
        message = '您选择的照片好像不是正确的截图，或者您的机型暂时不支持。'
        await this.generateAlert('提示', message, ['知道了'])
        return
      }

      // Prompt for widget size and position.
      message = '您创建组件的是什么规格？'
      const sizes = ['小组件', '中组件', '大组件']
      const _sizes = ['Small', 'Medium', 'Large']
      const size = await this.generateAlert('提示', message, sizes)
      const widgetSize = _sizes[size]

      message = '在桌面上组件存在什么位置？'
      message += height === 1136 ? ' （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）' : ''

      // Determine image crop based on phone size.
      const crop = { w: 0, h: 0, x: 0, y: 0 }
      let positions: string[]
      let _positions: string[]
      let position: number
      switch (widgetSize) {
        case 'Small':
          crop.w = phone.small.w
          crop.h = phone.small.h
          positions = ['Top left', 'Top right', 'Middle left', 'Middle right', 'Bottom left', 'Bottom right']
          _positions = ['左上角', '右上角', '中间左', '中间右', '左下角', '右下角']
          position = await this.generateAlert('提示', message, _positions)

          // Convert the two words into two keys for the phone size dictionary.
          const keys = positions[position].toLowerCase().split(' ')
          crop.y = phone[keys[0]]
          crop.x = phone[keys[1]]
          break
        case 'Medium':
          crop.w = phone.medium.w
          crop.h = phone.medium.h

          // Medium and large widgets have a fixed x-value.
          crop.x = phone.left
          positions = ['Top', 'Middle', 'Bottom']
          _positions = ['顶部', '中部', '底部']
          position = await this.generateAlert('提示', message, _positions)
          const key = positions[position].toLowerCase()
          crop.y = phone[key]
          break
        case 'Large':
          crop.w = phone.large.w
          crop.h = phone.large.h
          crop.x = phone.left
          positions = ['Top', 'Bottom']
          _positions = ['顶部', '底部']
          position = await this.generateAlert('提示', message, _positions)

          // Large widgets at the bottom have the 'middle' y-value.
          crop.y = position ? phone.middle : phone.top
          break
      }

      // Crop image and finalize the widget.
      const imgCrop = cropImage(wallpaper, new Rect(crop.x, crop.y, crop.w, crop.h))

      const imageType = 'backgroundImage' + widgetSize
      this.setCacheImage(imageType, imgCrop)

      this.settings[imageType] = imageType
      await this.saveSettings()
    } catch (error) {
      // 取消图片会异常 暂时不用管
      console.error(error)
    }
  }

  /**
   * 自定义表格UI初始化
   */
  async handleJoinerHttpData(_table: UITable): Promise<object> {
    return {}
  }
}

export default UIRender
