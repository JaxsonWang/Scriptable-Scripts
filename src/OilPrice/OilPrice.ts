import UIRender from '@/Base/UIRender'
import WebviewPage from '@/Utils/Webview'
import SmallWidget from '@/OilPrice/Small'
import MediumWidget from '@/OilPrice/Medium'
import LargeWidget from '@/OilPrice/Large'

class OilPrice extends UIRender {
  private initResponse: object
  private areaOptions: SettingsForOptions[] = [
    {
      label: '北京',
      value: '11',
      name: 'beijing'
    },
    {
      label: '天津',
      value: '12',
      name: 'tianjin'
    },
    {
      label: '河北',
      value: '13',
      name: 'hebei'
    },
    {
      label: '山西',
      value: '14',
      name: 'shanxi'
    },
    {
      label: '河南',
      value: '41',
      name: 'henan'
    },
    {
      label: '山东',
      value: '37',
      name: 'shandong'
    },
    {
      label: '上海',
      value: '31',
      name: 'shanghai'
    },
    {
      label: '江苏',
      value: '32',
      name: 'jiangsu'
    },
    {
      label: '浙江',
      value: '33',
      name: 'zhejiang'
    },
    {
      label: '安徽',
      value: '34',
      name: 'anhui'
    },
    {
      label: '福建',
      value: '35',
      name: 'fujian'
    },
    {
      label: '江西',
      value: '36',
      name: 'jiangxi'
    },
    {
      label: '湖北',
      value: '42',
      name: 'hubei'
    },
    {
      label: '湖南',
      value: '43',
      name: 'hunan'
    },
    {
      label: '广东',
      value: '44',
      name: 'guangdong'
    },
    {
      label: '广西',
      value: '45',
      name: 'guangxi'
    },
    {
      label: '云南',
      value: '53',
      name: 'yunnan'
    },
    {
      label: '贵州',
      value: '52',
      name: 'guizhou'
    },
    {
      label: '海南',
      value: '46',
      name: 'hainan'
    },
    {
      label: '重庆',
      value: '50',
      name: 'chongqing'
    },
    {
      label: '四川',
      value: '51',
      name: 'sichuan'
    },
    {
      label: '新疆',
      value: '65',
      name: 'xinjiang'
    },
    {
      label: '内蒙古',
      value: '15',
      name: 'neimenggu'
    },
    {
      label: '辽宁',
      value: '21',
      name: 'liaoning'
    },
    {
      label: '吉林',
      value: '22',
      name: 'jilin'
    },
    {
      label: '宁夏',
      value: '64',
      name: 'ningxia'
    },
    {
      label: '陕西',
      value: '61',
      name: 'shanxi-3'
    },
    {
      label: '黑龙江',
      value: '23',
      name: 'heilongjiang'
    },
    {
      label: '西藏',
      value: '54',
      name: 'xizang'
    },
    {
      label: '青海',
      value: '63',
      name: 'qinghai'
    },
    {
      label: '甘肃',
      value: '62',
      name: 'gansu'
    }
  ]
  private areaZoneOptions: SettingsForOptions[] = this.settings['areaZoneOptions'] || []
  protected version: string
  protected isUpdate: boolean
  private readonly updateHttp: string
  constructor(args: string) {
    super(args)
    this.defaultRefreshAfterDate = 60
    this.isUpdate = false
    this.updateHttp = 'https://joiner.i95.me/v4/joiner.json'
    this.version = '2.0.0'
  }

  /**
   * 成功色调
   * @param alpha
   * @returns {Color}
   */
  successColor = (alpha = 1) => new Color('#67C23A', alpha)

  /**
   * 警告色调
   * @param alpha
   * @returns {Color}
   */
  warningColor = (alpha = 1) => new Color('#E6A23C', alpha)

  /**
   * 危险色调
   * @param alpha
   * @returns {Color}
   */
  dangerColor = (alpha = 1) => new Color('#F56C6C', alpha)

  /**
   * UI 设置插件配置项
   */
  getSettingsDefaultPluginKeys(): object {
    return {
      areaType: '32',
      areaZoneType: 0,
      oilGradeColor: '#EB604D',
      oilIconType: 'drop',
      oilIconSize: 18
    }
  }

  /**
   * 获取插件组件设置数据并且初始化
   */
  getSettingsPlugin(): void {
    this.settings = this.getSettings()
    const defaultKeys = {
      ...this.getSettingsDefaultPluginKeys(),
      ...{
        oilStr: '',
        oilData: {}
      }
    }

    for (const defaultKey in defaultKeys) {
      this.settings[defaultKey] = this.settings[defaultKey] ?? defaultKeys[defaultKey]
    }
    this.saveSettings(false).then()
  }

  /**
   * 组件设置
   */
  async componentsConfig() {
    await WebviewPage({
      formItems: [
        {
          name: 'areaType',
          label: '地区区域',
          type: 'select',
          options: this.areaOptions,
          default: this.settings['areaType'],
          tip: '不同地区油价不同，请根据实际位置选择地区区域。'
        },
        {
          name: 'areaZoneType',
          label: '省份价区',
          type: 'select',
          options: this.areaZoneOptions,
          default: this.settings['areaTypeZone'],
          tip: '部分省份：「贵州、黑龙江、西藏、青海等」需要选择价区，其它省份无视此选项。第一次用请选择地区然后预览组件重新打开菜单选择本选项即可。'
        },
        {
          name: 'oilGradeColor',
          label: '油价标号字体颜色',
          type: 'color',
          default: this.settings['oilGradeColor']
        },
        {
          name: 'oilIconType',
          label: '「油价」图标名称',
          type: 'textarea',
          rows: 1,
          default: this.settings['oilIconType']
        },
        {
          name: 'oilIconSize',
          label: '「油价」图标大小',
          type: 'number',
          default: this.settings['oilIconSize']
        }
      ],
      title: '组件设置',
      widget: this
    })
  }

  async oilPriceData() {
    const options = {
      url: 'https://cx.sinopecsales.com/yjkqiantai/data/switchProvince',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json, text/plain, */*',
        Origin: 'https://cx.sinopecsales.com',
        Referer: 'https://cx.sinopecsales.com/yjkqiantai/core/initCpb'
      },
      body: JSON.stringify({
        provinceId: this.settings['areaType']
      })
    }
    try {
      const response = await this.http(options)
      this.settings['oilData'] = response
      await this.saveSettings(false)
      console.log('输出信息：')
      console.log(response)

      return await this.handleOilPriceData(this.settings['oilData'])
    } catch (error) {
      await this.writeLogs({
        url: options.url,
        error: error.toString()
      })
      return await this.handleOilPriceData(this.settings['oilData'])
    }
  }

  async handleOilPriceData(response) {
    const data = response['data']
    // const province = data['provinceData']
    // const provinceCheck = data['provinceCheck']
    const areaData = data['area']
    let provinceData = {}
    let provinceCheck = {}
    if (areaData.length !== 0) {
      this.settings['areaZoneOptions'] = areaData.map((item, index: number) => ({
        label: item.areaCheck.AREA_NAME + ' - ' + (item.areaCheck.AREA_DESC || item.areaCheck.PROVINCE_NAME),
        value: index,
        name: item.areaCheck.AREA_DESC
      }))
      await this.saveSettings(false)
      provinceData = areaData[this.settings['areaZoneType']].areaData
      provinceCheck = areaData[this.settings['areaZoneType']].areaCheck
    } else {
      this.settings['areaZoneOptions'] = []
      await this.saveSettings(false)
      provinceData = data['provinceData']
      provinceCheck = data['provinceCheck']
    }
    if (provinceData && Object.keys(provinceData).length !== 0) {
      const startDateData = provinceData['START_DATE'].slice(0, 10)
      const day = 1000 * 60 * 60 * 24
      // 中石化的时间少一天
      const startDate = new Date(new Date(startDateData).valueOf() + day)

      const handleConfirmField = (type: string): string => {
        if (type === '92') {
          if (provinceCheck['AIPAOE92'] === 'Y') return 'AIPAO_GAS_E92'
          if (provinceCheck['E92'] === 'Y') return 'E92'
          if (provinceCheck['GAS_92'] === 'Y') return 'GAS_92'
        }
        if (type === '95') {
          if (provinceCheck['AIPAO95'] === 'Y') return 'AIPAO_GAS_95'
          if (provinceCheck['AIPAOE95'] === 'Y') return 'AIPAO_GAS_E95'
          if (provinceCheck['E95'] === 'Y') return 'E95'
          if (provinceCheck['GAS_95'] === 'Y') return 'GAS_95'
        }
        if (type === '98') {
          if (provinceCheck['AIPAO98'] === 'Y') return 'AIPAO_GAS_98'
          if (provinceCheck['AIPAOE98'] === 'Y') return 'AIPAO_GAS_E98'
          if (provinceCheck['E98'] === 'Y') return 'E98'
          if (provinceCheck['GAS_98'] === 'Y') return 'GAS_98'
        }
        if (type === '0') {
          if (provinceCheck['CHAI_0'] === 'Y') return 'CHECHAI_0'
        }
      }

      return {
        startDate: this.formatDate(new Date(startDate), 'yyyy年MM月dd日'),

        oil92: provinceData[handleConfirmField('92')]
          ? provinceData[handleConfirmField('92')].toLocaleString('zh-CN', {
              style: 'currency',
              currency: 'CNY'
            })
          : '未开放',
        oil95: provinceData[handleConfirmField('95')]
          ? provinceData[handleConfirmField('95')].toLocaleString('zh-CN', {
              style: 'currency',
              currency: 'CNY'
            })
          : '未开放',
        oil98: provinceData[handleConfirmField('98')]
          ? provinceData[handleConfirmField('98')].toLocaleString('zh-CN', {
              style: 'currency',
              currency: 'CNY'
            })
          : '未开放',
        oil0: provinceData[handleConfirmField('0')]
          ? provinceData[handleConfirmField('0')].toLocaleString('zh-CN', {
              style: 'currency',
              currency: 'CNY'
            })
          : '未开放'
      }
    } else {
      return {
        startDate: '该地区获取数据获取失败无法',
        oil92: '0.00',
        oil95: '0.00',
        oil98: '0.00',
        oil0: '0.00'
      }
    }
  }

  async forecastOilPriceData() {
    const webView = new WebView()
    let url = 'http://m.qiyoujiage.com/jiangsu.shtml'
    if (this.settings['areaType']) {
      const areaName = this.areaOptions.find(i => i.value === this.settings['areaType']).name
      url = `http://m.qiyoujiage.com/${areaName}.shtml`
    }
    console.log('area name url: ')
    console.log(url)
    await webView.loadURL(url)

    const js = `const text = document.querySelector('.tishi').innerText;output = text;`
    let str = ''
    try {
      str = await webView.evaluateJavaScript(js)
      this.settings['oilStr'] = str
      console.log('保存到缓存：')
      console.log(this.settings['oilStr'])
      await this.saveSettings(false)
    } catch (error) {
      str = this.settings['oilStr']
    }
    const regex = /\d+\.\d+元\/升-\d+\.\d+元\/升/gm
    const match = str.match(regex)
    // 预测油价价格
    let forecastPrice = '0.00'
    let forecastDate = this.formatDate(new Date(), 'yyyy年MM月dd日')
    // 油价上涨、下跌还是搁浅 rising、falling、stranded
    let priceDirection: 'rising' | 'falling' | 'stranded' = 'stranded'
    if (/搁浅/gm.test(str)) priceDirection = 'stranded'
    if (/上涨|大涨|上调/gm.test(str)) priceDirection = 'rising'
    if (/下跌|大跌|下调/gm.test(str)) priceDirection = 'falling'

    if (match) {
      let data: string | string[] = match[0] // 输出 "0.27元/升-0.33元/升"
      data = data.replaceAll('元/升', '')
      data = data.split('-')

      forecastPrice = (Math.floor((Number(data[0]) + (Number(data[1]) - Number(data[0])) / 2) * 100) / 100).toFixed(2)
    } else {
      // 可能存在搁浅
      forecastPrice = '0.00'
    }

    const dateRegex = /(\d{1,2}月\d{1,2}日)/
    const dateRegexYear = /(\d{4}年\d{1,2}月\d{1,2}日)/
    const hasYearMatch = dateRegexYear.test(str)
    const dateMatch = hasYearMatch ? str.match(dateRegexYear) : str.match(dateRegex)

    if (dateMatch) {
      let datetime = hasYearMatch ? dateMatch[1] + '00:00:00' : new Date().getFullYear() + '/' + dateMatch[1] + '00:00:00'
      datetime = datetime.replaceAll('年', '/').replaceAll('月', '/').replaceAll('日', ' ')
      forecastDate = this.formatDate(new Date(datetime), 'yyyy年MM月dd日')
    }
    console.log('预测油价')
    console.log(forecastPrice)
    console.log('预测日期')
    console.log(forecastDate)

    return {
      priceDirection,
      forecastDate,
      forecastPrice
    }
  }

  async getData() {
    return {
      ...(await this.forecastOilPriceData()),
      ...(await this.oilPriceData()),
      ...{
        region: this.areaOptions.find(i => i.value === this.settings['areaType']).label,
        showBackgroundImage: this.settings['showBackgroundImage'],
        bgColorInLight: this.settings['bgColorInLight'],
        bgColorInDark: this.settings['bgColorInDark'],
        bgColorGradient: this.settings['bgColorGradient'],
        fontFamilyInRegular: this.settings['fontFamilyInRegular'],
        fontFamilyInBold: this.settings['fontFamilyInBold'],
        textShadowColorInLight: this.settings['textShadowColorInLight'],
        textShadowColorInDark: this.settings['textShadowColorInDark'],
        showTextShadow: this.settings['showTextShadow'],
        textSizeGlobal: this.settings['textSizeGlobal'],
        textColorInLight: this.settings['textColorInLight'],
        textColorInDark: this.settings['textColorInDark'],
        oilGradeColor: this.settings['oilGradeColor'],
        oilIconType: this.settings['oilIconType'],
        oilIconSize: this.settings['oilIconSize']
      }
    }
  }

  async render(): Promise<ListWidget> {
    const data = await this.getData()
    console.log('小组件所需接口数据：')
    console.log(data)

    const widgetFamilyList = {
      small: SmallWidget.bind(this),
      medium: MediumWidget.bind(this),
      large: LargeWidget.bind(this)
    }

    return widgetFamilyList[this.widgetFamily](data)
  }

  /**
   * 自定义表格UI初始化
   */
  async handleJoinerHttpData(): Promise<object> {
    const response = (await this.http({
      url: this.updateHttp,
      method: 'GET'
    })) as object
    this.initResponse = response
    await this.checkUpdate(false)
    return response
  }

  /**
   * 检查更新
   * @param notify
   */
  async checkUpdate(notify = true): Promise<any> {
    // 请求数据
    const response = this.initResponse
      ? this.initResponse
      : await this.http({
          url: this.updateHttp,
          method: 'GET'
        })

    await this.saveSettings(false)
    const resourcesData = response['resources'].find(i => i.id === 'OilPrice')
    // 没有更新通知消息
    if (resourcesData['version'] === this.version) {
      return notify && this.notify('无需更新', '远程版本一致，暂无更新')
    }
    // 检测到更新
    const table = new UITable()
    table.showSeparators = false

    const header = new UITableRow()
    header.height = 68
    header.backgroundColor = Color.dynamic(new Color('#F2F1F6'), new Color('#000000'))
    const heading = header.addText('更新提示', `是否需要升级到${resourcesData['version']}版本`)
    heading.titleFont = Font.mediumSystemFont(17)
    heading.titleColor = this.warningColor()
    heading.centerAligned()
    table.addRow(header)

    // 正文
    resourcesData['changelog'].forEach(item => {
      const row = new UITableRow()
      row.height = 54
      const rowText = row.addText(item)
      rowText.titleFont = Font.mediumSystemFont(14)
      table.addRow(row)
    })

    // 提醒
    const row = new UITableRow()
    row.height = 54
    const tipsText = row.addText('⚠️⚠️⚠️ 更新成功请关闭菜单窗口，重新运行脚本，否则无法使用最新小组件。')
    tipsText.titleFont = Font.mediumSystemFont(14)
    tipsText.titleColor = this.dangerColor()
    table.addRow(row)

    const menuRow = new UITableRow()
    menuRow.height = 54
    const buttonCell1 = menuRow.addButton(' ')
    buttonCell1.titleFont = Font.mediumSystemFont(14)
    buttonCell1.titleColor = Color.gray()
    buttonCell1.widthWeight = 1
    buttonCell1.centerAligned()

    const buttonCell2 = menuRow.addButton('点击此处更新小组件')
    buttonCell2.dismissOnTap = true
    buttonCell2.titleFont = Font.mediumSystemFont(16)
    buttonCell2.titleColor = this.successColor()
    buttonCell2.widthWeight = 1
    buttonCell2.centerAligned()
    buttonCell2.onTap = async () => {
      // 处理更新文件
      const fileName = Script.name() + '.js'
      const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()
      await this.notify('正在更新中...')
      const raw = (await this.http({
        url: resourcesData['download'],
        type: 'load'
      })) as Data
      FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), fileName), raw)

      this.isUpdate = true

      await this.notify('Joiner 桌面组件更新完毕!', '⚠️注意：请重新运行脚本！')
    }
    table.addRow(menuRow)
    await table.present()
  }
}

export default OilPrice
