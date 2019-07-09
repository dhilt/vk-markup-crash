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
      if (this.getOption(options, 'header')) {
        this.processHeader()
      }
      if (this.getOption(options, 'ads')) {
        this.addCss(this.rules.ADDS)
      }
      if (this.getOption(options, 'round_icons')) {
        this.addCss(this.rules.ROUND_ICONS)
      }
      if (this.getOption(options, 'wide_layout')) {
        this.addCss(this.rules.WIDE_LAYOUT)
      }
      if (this.getOption(options, 'margins_and_paddings')) {
        this.addCss(this.rules.MARGINS_AND_PADDINGS)
      }
    }

    getOption(options, token) {
      const option = options.find(option => option.id === token)
      return option && option.value
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
