const Webview = async (options: any) => {
  const {
    formItems = [],
    widget,
    isHome = false,
    title = 'Joiner',
    info = {},
    homePage = 'https://iiong.com'
  } = options

  const getSettingsDefaultCoreKeys = widget.getSettingsDefaultCoreKeys()
  const getSettingsDefaultPluginKeys = widget.getSettingsDefaultPluginKeys()
  const defaultSettings = { ...getSettingsDefaultCoreKeys, ...getSettingsDefaultPluginKeys }

  const html = `<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Joiner Settings</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <link
      rel="stylesheet"
      href="https://cdn.staticfile.org/bootstrap/5.2.3/css/bootstrap.min.css"
      type="text/css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.staticfile.org/remixicon/3.0.0/remixicon.min.css"
      type="text/css"
    />
    <style>
      :root {
        --color-primary: #007aff;
        --divider-color: rgba(60, 60, 67, 0.36);
        --card-background: #fff;
        --card-radius: 10px;
        --list-header-color: rgba(60, 60, 67, 0.6);
      }
      * {
        -webkit-user-select: none;
        user-select: none;
      }
      body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        accent-color: var(--color-primary);
      }
      input {
        -webkit-user-select: auto;
        user-select: auto;
      }
      body {
        background: #f2f2f7;
      }
      button {
        font-size: 16px;
        color: #000;
        border-radius: 8px;
        border: none;
        padding: 0.24em 0.5em;
      }
      button i.remixicon {
        margin-right: 6px;
      }
      .list {
        margin: 15px;
      }
      .list__header {
        margin: 0 20px;
        color: var(--list-header-color);
        font-size: 13px;
      }
      .list__body {
        margin-top: 10px;
        background: var(--card-background);
        border-radius: var(--card-radius);
        overflow: hidden;
      }
      .form-item-wrapper {
        display: block;
        position: relative;
      }
      .form-item-wrapper + .form-item-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 20px;
        right: 0;
        border-top: 0.5px solid var(--divider-color);
      }
      .form-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        min-height: 2em;
        padding: 0.5em 20px;
        position: relative;
      }
      .form-item-wrapper:active {
        background-color: #F7F7F7;
      }
      .form-item-info {
        position: relative;
        padding: 0.5em 20px;
        font-size: 14px;
      }
      .form-item--link .ri-arrow-right-s-line {
        color: #86868b;
      }
      .form-item input,
      .form-item select {
        font-size: 14px;
        text-align: right;
      }
      .form-item input[type='checkbox'] {
        width: 1.25em;
        height: 1.25em;
      }
      input[type='number'] {
        width: 4em;
      }
      input[type='date'] {
        min-width: 6.4em;
      }
      input[type='checkbox'][role='switch'] {
        position: relative;
        display: inline-block;
        appearance: none;
        width: 40px;
        height: 24px;
        border-radius: 24px;
        background: #ccc;
        transition: 0.3s ease-in-out;
      }
      input[type='checkbox'][role='switch']::before {
        content: '';
        position: absolute;
        left: 2px;
        top: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        transition: 0.3s ease-in-out;
      }
      input[type='checkbox'][role='switch']:checked {
        background: var(--color-primary);
      }
      input[type='checkbox'][role='switch']:checked::before {
        transform: translateX(16px);
      }
      textarea {
        width: 100%;
        font-size: 14px;
        resize: vertical;
        margin: 10px 0;
      }
      button.add-colors {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        border-radius: 0;
        background-color: transparent;
      }
      button.add-colors i.remixicon {
        font-size: 24px;
        margin: 0;
      }
      .colors-list {
        display: flex;
        flex-wrap: wrap;
        padding-top: 5px;
      }
      .color-item {
        width: calc(33% - 20px);
        background-color: #efefef;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 5px 10px;
        padding: 5px;
        border-radius: 5px;
      }
      .color-item button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5px;
        border-radius: 0;
        background-color: transparent;
      }
      .color-item button i.remixicon {
        font-size: 24px;
        color: #dc3545;
        margin: 0;
      }
      .copyright {
        font-size: 12px;
        color: #86868b;
      }
      .copyright a {
        color: #515154;
        text-decoration: none;
      }
      .preview.loading {
        pointer-events: none;
      }
      .ri-refresh-line {
        display: inline-block;
        animation: 1s linear infinite spin;
      }
      @keyframes spin {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(1turn);
        }
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --divider-color: rgba(84, 84, 88, 0.65);
          --card-background: #1c1c1e;
          --list-header-color: rgba(235, 235, 245, 0.6);
        }
        body {
          background: #000;
          color: #fff;
        }
        button {
          color: #fff;
        }
        .form-item-wrapper:active {
          background-color: #36363a;
        }
      }
    </style>
  </head>
  <body>
    <header class="d-flex justify-content-between align-items-center pt-4">
      <img src="https://img.alicdn.com/imgextra/i3/2038135983/O1CN01I63qnz1u4GQlg9gHR_!!2038135983.png" height="30" alt="header" class="header-image-left" />
      <div class="fs-6 font-monospace header-title text-center w-100">Joiner</div>
      <img src="https://img.alicdn.com/imgextra/i2/2038135983/O1CN01MDqJFm1u4GQsVNZsX_!!2038135983.png" height="30" alt="header" class="header-image-right" />
    </header>
    <div class="list universal">
      <div class="list__header">通用</div>
      <form class="list__body" action="javascript:void(0);">
        <label id="reset" class="form-item-wrapper">
          <div class="form-item form-item--link">
            <span>还原当前选项</span>
            <i class="remixicon ri-arrow-right-s-line"></i>
          </div>
        </label>
      </form>
    </div>
    <div class="list">
      <div class="list__header">预览</div>
      <form class="list__body" action="javascript:void(0);">
        <label class="form-item-wrapper preview" data-size="small">
          <div class="form-item form-item--link">
            <div class="d-flex align-items-center">
              <i class="remixicon ri-eye-line"></i>
              <span class="ms-1">小尺寸</span>
            </div>
            <div class="d-flex align-items-center">
              <span>Small</span>
                <i class="remixicon ri-arrow-right-s-line"></i>
            </div>
          </div>
        </label>
        <label class="form-item-wrapper preview" data-size="medium">
          <div class="form-item form-item--link">
            <div class="d-flex align-items-center">
              <i class="remixicon ri-eye-line"></i>
              <span class="ms-1">中尺寸</span>
            </div>
            <div class="d-flex align-items-center">
              <span>Medium</span>
              <i class="remixicon ri-arrow-right-s-line"></i>
            </div>
          </div>
        </label>
        <label class="form-item-wrapper preview" data-size="large">
          <div class="form-item form-item--link">
            <div class="d-flex align-items-center">
              <i class="remixicon ri-eye-line"></i>
              <span class="ms-1">大尺寸</span>
            </div>
            <div class="d-flex align-items-center">
              <span>Large</span>
                <i class="remixicon ri-arrow-right-s-line"></i>
            </div>
          </div>
        </label>
      </form>
    </div>
    <div class="list">
      <div class="list__header">设置</div>
      <form id="form" class="list__body" action="javascript:void(0);"></form>
    </div>
    <footer class="copyright">
      <div class="text-center">
        当前版本：<span id="version"></span> - 淮城一只猫
      </div>
      <div class="text-center"> Joiner 系列小组件永久免费，向您收费全是骗子！ </div>
      <div class="d-flex justify-content-center align-items-center px-3 py-2">
        <img id="banner" src="https://img.alicdn.com/imgextra/i1/2038135983/O1CN01vMMYHI1u4GSiCG8LS_!!2038135983.png" alt="png" class="w-100 rounded-3">
      </div>
    </footer>
    <script>
      ;(() => {
        const isHomePage = ${JSON.stringify(isHome)}
        const settings = ${JSON.stringify(widget.settings)}
        const formItems = ${JSON.stringify(formItems)}
        const info = ${JSON.stringify(info)}
        const defaultSettings = ${JSON.stringify(defaultSettings)}

        if (!isHomePage) {
          document.querySelector('.header-title').innerText = ${JSON.stringify(title)}

          document.querySelector('.copyright').remove()
          document.querySelector('.header-image-left').remove()
          document.querySelector('.header-image-right').remove()
        } else {
          document.querySelector('.universal').remove()
          if (info && info.banner && info.banner.image) document.querySelector('#banner').src = info.banner.image
          document.querySelector('#version').innerText = ${JSON.stringify(widget.version)}
        }

        window.invoke = (code, data) => {
          window.dispatchEvent(new CustomEvent('JBridge', { detail: { code, data } }))
        }

        const formData = {}
        const fragment = document.createDocumentFragment()

        const addColorWrapper = (listWrapper, item, value) => {
          const uuid = URL.createObjectURL(new Blob()).substring(28)

          const listItem = document.createElement('div')
          listItem.className = 'color-item item-' + uuid + ' item-' + item.name
          const color = document.createElement('input')
          color.type = 'color'
          if (value) color.value = value
          color.addEventListener('change', event => {
            saveColors(item)
          })
          listItem.appendChild(color)
          const button = document.createElement('button')
          const removeColorWrapper = event => {
            event.preventDefault()
            document.querySelector('.item-' + uuid).remove()
            saveColors(item)
            button.removeEventListener('click', removeColorWrapper)
          }
          button.addEventListener('click', removeColorWrapper)
          const icon = document.createElement('i')
          icon.className = 'remixicon ri-delete-bin-line'
          button.appendChild(icon)
          listItem.appendChild(button)
          listWrapper.appendChild(listItem)
        }
        const saveColors = (item) => {
          const colors = []
          document.querySelectorAll('.color-item.item-' + item.name + ' input[type="color"]').forEach(ele => {
            colors.push(ele.value)
          })
          formData[item.name] = colors
          invoke('changeSettings', formData)
        }
        for (const item of formItems) {
          if (!item) continue
          if (JSON.stringify(item) === '{}') break
          const value = settings[item.name] ?? item.default ?? null
          if (item.type !== 'cell') formData[item.name] = value
          const labelWrapper = document.createElement('label')
          labelWrapper.className = 'form-item-wrapper'

          const label = document.createElement('div')
          label.className = item.type === 'textarea' || item.type === 'colors' ? 'form-item d-block' : 'form-item'

          const div = document.createElement('div')
          div.innerText = item.label

          label.appendChild(div)
          if (item.type === 'select') {
            const select = document.createElement('select')
            select.className = 'form-item__input'
            select.name = item.name
            select.value = value
            select.style.width = '100px'
            select.setAttribute('type', item.type)
            for (const opt of item.options || []) {
              const option = document.createElement('option')
              option.value = opt.value
              option.innerText = opt.label
              option.selected = value === opt.value
              select.appendChild(option)
            }
            select.addEventListener('change', event => {
              formData[item.name] = event.target.value
              invoke('changeSettings', formData)
            })
            label.appendChild(select)
          } else if (item.type === 'textarea') {
            const textarea = document.createElement('textarea')
            textarea.className = 'form-item__input'
            textarea.name = item.name
            textarea.value = value
            textarea.rows = item.rows || 5
            textarea.placeholder = item.placeholder || defaultSettings[item.name] || '请输入'
            textarea.style.userSelect = 'auto'
            textarea.style.webkitUserSelect = 'auto'
            textarea.setAttribute('type', item.type)
            textarea.addEventListener('change', event => {
              formData[item.name] = event.target.value
              invoke('changeSettings', formData)
            })
            label.appendChild(textarea)
          } else if (item.type === 'colors') {
            const listWrapper = document.createElement('div')
            listWrapper.className = 'colors-list form-item__input'
            listWrapper.setAttribute('name', item.name)
            listWrapper.setAttribute('type', item.type)

            const addColorButton = document.createElement('button')
            addColorButton.className = 'add-colors'
            const icon = document.createElement('i')
            icon.className = 'remixicon ri-add-circle-line'
            addColorButton.appendChild(icon)
            addColorButton.addEventListener('click', event => {
              addColorWrapper(listWrapper, item)
              saveColors(item)
            })

            ;(formData[item.name] ?? []).forEach(i => {
              addColorWrapper(listWrapper, item, i)
            })

            label.appendChild(addColorButton)
            label.appendChild(listWrapper)
          } else if (item.type === 'cell') {
            label.classList.add('form-item--link')
            const icon = document.createElement('i')
            icon.className = 'remixicon ri-arrow-right-s-line'
            label.appendChild(icon)
            label.addEventListener('click', () => {
              invoke('cellClick', item)
            })
          } else {
            const input = document.createElement('input')
            input.className = 'form-item__input'
            input.name = item.name
            input.type = item.type || 'text'
            input.enterKeyHint = 'done'
            input.value = value
            input.placeholder = item.placeholder || defaultSettings[item.name] || '请输入'
            // Switch
            if (item.type === 'switch') {
              input.type = 'checkbox'
              input.role = 'switch'
              input.checked = value
            }
            if (item.type === 'number') {
              input.inputMode = 'decimal'
            }
            if (input.type === 'text') {
              input.size = 12
            }
            input.addEventListener('change', event => {
              formData[item.name] =
                item.type === 'switch'
                  ? event.target.checked
                  : item.type === 'number'
                  ? Number(event.target.value)
                  : event.target.value
              invoke('changeSettings', formData)
            })
            label.appendChild(input)
          }
          labelWrapper.appendChild(label)

          if (item.tip) {
            const tip = document.createElement('div')
            tip.className = 'form-item-info text-secondary'
            tip.innerHTML = item.tip
            labelWrapper.appendChild(tip)
          }

          fragment.appendChild(labelWrapper)
        }
        document.getElementById('form').appendChild(fragment)
        for (const btn of document.querySelectorAll('.preview')) {
          btn.addEventListener('click', e => {
            const target = e.currentTarget
            target.classList.add('loading')
            const icon = e.currentTarget.querySelector('.remixicon')
            const className = icon.className
            icon.className = 'remixicon ri-refresh-line'
            const listener = event => {
              const { code } = event.detail
              if (code === 'previewStart') {
                target.classList.remove('loading')
                icon.className = className
                window.removeEventListener('JWeb', listener)
              }
            }
            window.addEventListener('JWeb', listener)
            invoke('preview', e.currentTarget.dataset.size)
          })
        }
        const reset = () => {
          document.querySelectorAll('.form-item__input').forEach(el => {
            const name = el.getAttribute('name')
            const type = el.getAttribute('type')
            formData[name] = defaultSettings[name]
            if (type === 'checkbox') {
              el.checked = defaultSettings[name]
            } else if (type === 'colors') {
              el.innerHTML = ''
              ;(defaultSettings[name] || []).forEach(color => {
                addColorWrapper(el, formItems.find(i => i.name === name), color)
              })
            } else {
              el && (el.value = defaultSettings[name])
            }
          })
          invoke('changeSettings', formData)
        }
        document.body.addEventListener('touchstart', function () {})
        if (!isHomePage) document.getElementById('reset').addEventListener('click', () => reset())
      })()
    </script>
  </body>
</html>
`
  const webView = new WebView()
  await webView.loadHTML(html, homePage)

  const injectListener = async () => {
    const event = await webView
      .evaluateJavaScript(
        `(() => {
        const controller = new AbortController()
        const listener = (e) => {
          completion(e.detail)
          controller.abort()
        }
        window.addEventListener(
          'JBridge',
          listener,
          { signal: controller.signal }
        )
      })()`,
        true
      )
      .catch(err => {
        console.error(err)
        throw err
      })
    const { code, data } = event
    switch (code) {
      case 'preview': {
        const sizes = {
          small: 'Small',
          medium: 'Medium',
          large: 'Large'
        }
        widget.widgetFamily = data
        const render = await widget.render()
        await render[`present${sizes[data]}`]()

        await webView.evaluateJavaScript(
          "window.dispatchEvent(new CustomEvent('JWeb', { detail: { code: 'previewStart' } }))",
          false
        )
        break
      }
      case 'safari':
        await Safari.openInApp(data, true)
        break
      case 'changeSettings':
        for (const key in data) {
          widget.settings[key] = data[key]
        }
        await widget.saveSettings(false)
        break
      case 'cellClick':
        widget?.[data.name]()
        break
    }
    await injectListener()
  }

  injectListener().catch(error => {
    console.error(error)
    throw error
  })

  await webView.present()
}

export default Webview
