export default class Core {
  // 组件参数
  private readonly args: string
  // 组件大小规格
  protected widgetFamily:
    | 'small'
    | 'medium'
    | 'large'
    | 'extraLarge'
    | 'accessoryRectangular'
    | 'accessoryInline'
    | 'accessoryCircular'
  // 组件设置键值
  protected settingKey: string
  // 组件设置数据
  protected settings: object
  // 菜单动作
  protected actions: object = {}
  // 文件路径
  protected readonly fileMGR: FileManager = module.filename.includes('Documents/iCloud~')
    ? FileManager.iCloud()
    : FileManager.local()
  // 缓存文件夹
  private readonly cacheFolder: string = `JoinerCache-${this.hash(Script.name())}/`
  // 缓存文件夹
  protected readonly cacheFolderPath: string = FileManager.local().joinPath(
    FileManager.local().temporaryDirectory(),
    this.cacheFolder
  )
  // library 目录文件夹定义
  private readonly libraryFolder: string = `JoinerLibrary-${this.hash(Script.name())}/`
  // library 文件夹
  protected readonly libraryFolderFolderPath: string = FileManager.local().joinPath(
    FileManager.local().libraryDirectory(),
    this.libraryFolder
  )
  // 存储数据文件夹
  private readonly fileFolder: string = 'Joiner'
  // 存储数据文件夹路径
  protected fileFolderPath: string = this.fileMGR.joinPath(this.fileMGR.documentsDirectory(), this.fileFolder)
  // 是否使用 iCloud 服务
  private uses_iCloud: boolean = module.filename.includes('Documents/iCloud~')
  protected defaultRefreshAfterDate: number

  constructor(args = '') {
    // 组件参数
    this.args = args

    this.writeLogs({
      msg: `args: ${this.args}`
    }).then()

    this.init()
  }

  /**
   * 初始化配置
   * @param widgetFamily 组件大小规格
   */
  init(widgetFamily = config.widgetFamily): void {
    // 判断存储数据文件夹是否存在，不存在则新建存储数据文件夹
    if (!this.fileMGR.fileExists(this.fileFolderPath)) this.fileMGR.createDirectory(this.fileFolderPath, true)
    // 判断缓存文件夹是否存在，不存在则新建存储数据文件夹
    if (!FileManager.local().fileExists(this.libraryFolderFolderPath))
      FileManager.local().createDirectory(this.libraryFolderFolderPath, true)
    // 设置组件大小规格
    this.widgetFamily = widgetFamily
    // 组件设置唯一键
    this.settingKey = this.hash(Script.name())

    // 菜单动作初始化
    this.actions = {}

    // 获取组件设置数据并且初始化
    this.getSettingsCore()

    // 日志中心处理
    this.handleLogs()
  }

  /**
   * 日志中心处理
   */
  handleLogs() {
    const recordDate = this.settings['widgetRecordDate']
    const localMonth = this.formatDate(new Date(recordDate), 'yyyy-MM-dd')
    const nowMonth = this.formatDate(new Date(), 'yyyy-MM-dd')

    if (localMonth != nowMonth) {
      this.settings['widgetLogs'] = []
      this.settings['widgetRecordDate'] = new Date().valueOf()
      // this.saveSettings(false).then()
    }
    this.saveSettings(false).then()
  }

  /**
   * UI 设置核心配置项
   */
  getSettingsDefaultCoreKeys(): object {
    return {
      refreshAfterDate: this.defaultRefreshAfterDate || 0,
      textSizeGlobal: '100',
      textColorInLight: '#000000',
      textColorInDark: '#ffffff',
      showTextShadow: false,
      textShadowColorInLight: '#000000',
      textShadowColorInDark: '#ffffff',
      fontFamilyInRegular: 'PingFangSC-Regular',
      fontFamilyInBold: 'PingFangSC-Medium',
      bgColorInLight: ['#ffffff', '#dbefff'],
      bgColorInDark: ['#414345', '#232526'],
      bgColorGradient: '0.0,1.0',
      showBackgroundImage: false,
      backgroundImageSmall: '',
      backgroundImageMedium: '',
      backgroundImageLarge: '',
      widgetRecordDate: new Date().valueOf(),
      widgetLogs: []
    }
  }

  /**
   * 获取核心组件设置数据并且初始化
   */
  getSettingsCore() {
    this.settings = this.getSettings()
    const defaultKeys = this.getSettingsDefaultCoreKeys()

    for (const defaultKey in defaultKeys) {
      this.settings[defaultKey] = this.settings[defaultKey] ?? defaultKeys[defaultKey]
    }

    this.saveSettings(false).then(() => this.getSettingsPlugin())
  }

  /**
   * 获取插件组件设置数据并且初始化
   */
  getSettingsDefaultPluginKeys(): object {
    // 用于插件设置来重写此方法
    return {}
  }

  /**
   * 获取插件组件设置数据并且初始化
   */
  getSettingsPlugin(): void {
    // 用于插件设置来重写此方法
  }

  /**
   * 删除插件任何数据
   */
  handleResetPlugin() {
    // 清除设置key
    if (Keychain.contains(this.settingKey)) Keychain.remove(this.settingKey)
    // 清除资源文件
    if (this.fileMGR.fileExists(this.libraryFolderFolderPath)) this.fileMGR.remove(this.libraryFolderFolderPath)
  }

  /**
   * 获取当前组件的设置
   * @param json
   * @param key
   * @return Promise<any>
   */
  getSettings(json = true, key = this.settingKey): any {
    let data = ''
    if (Keychain.contains(key)) data = Keychain.get(key)
    try {
      return json ? JSON.parse(data) : data
    } catch (error) {
      // 第一次加载可能出现空数据的问题，需要做初始化
      console.warn('存储键值对象不存在，创建对象：' + error.toString())
      const data = json ? JSON.stringify({}) : ''
      Keychain.set(key, data)
      this.writeLogs({ error: error.toString() }).then()
      return json ? JSON.parse(data) : data
    }
  }

  /**
   * 存储当前设置
   * @param notify 是否通知提示
   * @return Promise<void>
   */
  async saveSettings(notify = true): Promise<void> {
    const data = typeof this.settings === 'object' ? JSON.stringify(this.settings) : String(this.settings)
    Keychain.set(this.settingKey, data)
    if (notify) await this.notify('设置成功', '桌面组件稍后将自动刷新')
  }

  /**
   * 获取文件导入数据
   * @return {Promise<object>} 设置数据对象
   */
  async getImportConfigure(): Promise<object> {
    const settingsPath = this.fileMGR.joinPath(this.fileFolderPath, `${Script.name()}.json`)
    if (!this.fileMGR.fileExists(settingsPath)) {
      this.fileMGR.writeString(settingsPath, '{}')
      return {}
    } else {
      if (this.uses_iCloud) await this.fileMGR.downloadFileFromiCloud(settingsPath)
      const settings = this.fileMGR.readString(settingsPath)
      return JSON.parse(settings)
    }
  }

  /**
   * 导出数据
   * @param data 设置数据对象
   * @param notify 是否系统通知
   * @return {Promise<void>}
   */
  async importConfigure(data: object, notify = true): Promise<any> {
    const settingsPath = this.fileMGR.joinPath(this.fileFolderPath, `${Script.name()}.json`)
    if (this.uses_iCloud) await this.fileMGR.downloadFileFromiCloud(settingsPath)
    this.fileMGR.writeString(settingsPath, JSON.stringify(data))
    if (notify) await this.notify('设置成功', '桌面组件稍后将自动刷新')
  }

  /**
   * 系统通知
   * @param title 通知标题
   * @param body 通知内容
   * @param url 点击后打开的URL
   * @param opts 配置项
   * @return {Promise<void>}
   */
  async notify(title = '', body = '', url = undefined, opts = {}): Promise<void> {
    try {
      let notification = new Notification()
      notification = Object.assign(notification, opts)
      notification.title = title
      notification.body = body
      if (url) notification.openURL = url
      return await notification.schedule()
    } catch (error) {
      console.warn(error)
    }
  }

  /**
   * Alert 弹窗封装
   * @param title
   * @param message
   * @param options
   * @param cancelText
   * @returns {Promise<number>}
   */
  async generateAlert(title = 'Joiner 提示', message: string, options: string[], cancelText = null): Promise<number> {
    const alert = new Alert()
    alert.title = title
    alert.message = message
    if (cancelText) alert.addCancelAction(cancelText)
    for (const option of options) {
      alert.addAction(option)
    }
    return await alert.presentAlert()
  }

  /**
   * 获取远程图片
   * @param url 图片地址
   * @param useCache 是否使用缓存（请求失败时获取本地缓存）
   * @return {Promise<Image>} 图片对象
   */
  async getImageByUrl(url: string, useCache = true): Promise<Image> {
    const cacheKey = this.hash(url)
    const cacheFile = this.getCacheImage(cacheKey)
    // 判断是否有缓存
    if (useCache && !!cacheFile) return cacheFile
    try {
      const req = new Request(url)
      const img = await req.loadImage()
      // 存储到缓存
      if (useCache) this.setCacheImage(cacheKey, img)
      return img
    } catch (error) {
      const err = { url: url, error: error.toString() }
      await this.writeLogs(err)
      // 没有缓存 + 失败情况下，返回自定义的绘制图片（红色背景）
      // todo 返回没有数据
      const ctx = new DrawContext()
      ctx.size = new Size(100, 100)
      ctx.setFillColor(Color.red())
      ctx.fillRect(new Rect(0, 0, 100, 100))
      return ctx.getImage()
    }
  }

  /**
   * 获取日志
   */
  async getErrorLog(): Promise<void> {
    const errors = this.settings['widgetLogs']
    const table = new UITable()
    table.showSeparators = true
    let row = new UITableRow()
    const title = row.addText('日志中心', '记录脚本行为，每日清空')
    title.titleFont = Font.boldSystemFont(13)
    title.subtitleFont = Font.systemFont(9)
    title.subtitleColor = Color.gray()
    table.addRow(row)

    for (const item of errors) {
      row = new UITableRow()
      row.dismissOnSelect = false
      const subtitle = this.formatDate(new Date(item.time), 'yyyy年MM月dd日 hh:mm:ss')
      if (item.error) {
        const t = row.addText(item.error, subtitle)
        t.titleFont = Font.boldSystemFont(13)
        t.titleColor = Color.red()
        t.subtitleFont = Font.systemFont(11)
        t.subtitleColor = Color.gray()
        row.onSelect = async () => {
          Pasteboard.copy(
            `${item.name}:
          ${item.error}
          url:${item.url}
          ${subtitle}`
          )
          await this.generateAlert('提示', '内容已复制到剪切板', ['知道了'])
        }
        table.addRow(row)
      }
      if (item.msg) {
        const t = row.addText(item.msg, subtitle)
        t.titleFont = Font.boldSystemFont(13)
        t.titleColor = Color.green()
        t.subtitleFont = Font.systemFont(11)
        t.subtitleColor = Color.gray()
        table.addRow(row)
      }
    }
    await QuickLook.present(table, false)
  }

  /**
   * 记录脚本异常
   */
  async writeLogs(logs: any) {
    logs.time = +new Date()
    // 初始化如 widgetLogs 字段非数组，将重新赋值新的数组
    if (!Array.isArray(this.settings['widgetLogs'])) this.settings['widgetLogs'] = []
    this.settings['widgetLogs'].unshift(logs)
    await this.saveSettings(false)
  }

  /**
   * 快捷指控
   */
  async siriShortcutData(): Promise<object> {
    return {}
  }

  /**
   * 注册菜单
   * @param name
   * @param func
   */
  registerAction(name: string, func: Function) {
    this.actions[name] = func.bind(this)
  }

  /**
   * 加载缓存图片
   * @param cacheKey
   * @return Image
   */
  getCacheImage(cacheKey: string) {
    const fm = FileManager.local()
    const cacheFile = fm.joinPath(this.libraryFolderFolderPath, cacheKey)
    const fileExists = fm.fileExists(cacheFile)
    return fileExists ? Image.fromFile(cacheFile) : undefined
  }

  /**
   * 加载缓存图片
   * @param cacheKey
   * @param image
   */
  setCacheImage(cacheKey: string, image: Image) {
    const fm = FileManager.local()
    const cacheFile = fm.joinPath(this.libraryFolderFolderPath, cacheKey)
    fm.writeImage(cacheFile, image)
  }

  /**
   * HTTP 请求接口
   * @param options 请求配置项
   * @return {String|Object|Image|Data} 响应数据
   */
  async http(options: any): Promise<string | object | Image | Data> {
    const url = options.url
    const method = options.method || 'GET'
    const headers = options.headers || {}
    const body = options.body || ''
    const type = options?.type || 'loadJSON'
    const timeout = options?.timeout || 5
    const secure = options?.secure || false

    const response = new Request(url)
    response.method = method
    response.headers = headers
    response.timeoutInterval = timeout
    response.allowInsecureRequest = secure
    if (method.toLowerCase() === 'post') response.body = body
    return response[type]()
  }

  /**
   * 时间格式化
   * @param date
   * @param format
   * @return
   */
  formatDate(date = new Date(), format = 'MM-dd HH:mm') {
    const formatter = new DateFormatter()
    formatter.dateFormat = format
    const updateDate = new Date(date)
    return formatter.string(updateDate)
  }

  /**
   * 对字符串进行 hash 加密
   * @param string 要加密的字符串
   * @return 加密字符串
   * @source: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   */
  hash(string: string): string {
    let hash = 0
    let i: number
    let chr: number
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0
    }
    return Math.abs(hash).toString()
  }

  /**
   * 重新运行当前脚本
   * @param scriptName
   */
  rerunWidget(scriptName = Script.name()) {
    Safari.open(`scriptable:///run/${encodeURIComponent(scriptName)}`)
  }

  /**
   * 延迟加载
   * @param milliseconds
   */
  sleep(milliseconds: number) {
    const startTime = new Date().getTime()
    while (new Date().getTime() < startTime + milliseconds) {}
    return
  }
}
