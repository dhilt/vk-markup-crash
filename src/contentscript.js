(() => {

  class VK_MARKUP_CRASH {

    constructor({ SETTINGS, RULES, CONFIG: { LS_TOKEN } }) {
      this.settings = SETTINGS
      this.rules = RULES
      this.lsToken = LS_TOKEN
    }

    getStorageDataAsync() {
      return new Promise(resolve =>
        chrome.storage.local.get(this.lsToken, items =>
          resolve(items[this.lsToken] || this.settings)
        )
      )
    }

    processStorageOptions(options) {
      if (this.getOption(options, 'HEADER')) {
        this.processHeader()
      }
      if (this.getOption(options, 'ADS')) {
        this.addCss(this.rules.ADDS)
      }
      if (this.getOption(options, 'ROUND_ICONS')) {
        this.addCss(this.rules.ROUND_ICONS)
      }
      if (this.getOption(options, 'WIDE_LAYOUT')) {
        this.addCss(this.rules.WIDE_LAYOUT)
      }
      if (this.getOption(options, 'MARGINS_AND_PADDINGS')) {
        this.addCss(this.rules.MARGINS_AND_PADDINGS)
      }
      if (this.getOption(options, 'NEW_COMMENT_ICON')) {
        this.addCss(this.rules.NEW_COMMENT_ICON)
      }
    }

    getOption(options, token) {
      const option = options.find(option => option.id === token)
      if (option && typeof option.value === 'boolean') {
        return option.value
      }
      const defaultOpt = this.settings.find(setting => setting.id === token)
      if (defaultOpt && typeof defaultOpt.value === 'boolean') {
        return defaultOpt.value
      }
      return false
    }

    addCss(rule) {
      const css = document.createElement('style')
      css.type = 'text/css'
      css.appendChild(document.createTextNode(rule));
      (document.head || document.documentElement).appendChild(css)
    }

    processHeader() {
      let isHeader = true;
      this.timerId = setInterval(() => {
        var header = document.getElementById('page_header_cont')
        if (header) {
          clearInterval(this.timerId)
          window.onscroll = () => {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop
            if (isHeader && scrolled > 0) {
              isHeader = false
              header.style.display = 'none'
            }
            else if (!isHeader && scrolled === 0) {
              isHeader = true
              header.style.display = 'block'
            }
          }
        }
      }, 75)
    }

    run() {
      this.getStorageDataAsync().then(result =>
        result && this.processStorageOptions(result)
      )
    }
  }

  const vk_markup_crash = new VK_MARKUP_CRASH(SHARED)
  vk_markup_crash.run()

})()
