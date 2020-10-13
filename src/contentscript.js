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
      const getOption = (token, subtoken = '') =>
        this.getOption({ options, settings: this.settings, token, subtoken })
      if (getOption('HEADER')) {
        this.processHeader()
      }
      if (getOption('ADS')) {
        this.addCss(this.rules.ADS)
      }
      if (getOption('ROUND_ICONS')) {
        this.addCss(this.rules.ROUND_ICONS)
      }
      if (getOption('WIDER_LAYOUT', 'ENABLED')) {
        const value = getOption('WIDER_LAYOUT', 'WIDTH');
        this.addCss(this.rules['WIDER_LAYOUT_' + value.toUpperCase()])
      }
      if (getOption('MARGINS_AND_PADDINGS')) {
        this.addCss(this.rules.MARGINS_AND_PADDINGS)
      }
      if (getOption('NEW_COMMENT_ICON')) {
        this.addCss(this.rules.NEW_COMMENT_ICON)
      }
      if (getOption('STORIES_CLIPS_RECOMMENDATIONS')) {
        this.addCss(this.rules.STORIES_CLIPS_RECOMMENDATIONS)
      }
    }

    getOption({ options, settings, token, subtoken }) {
      const option = options.find(option => option.id === token)
      if (subtoken) {
        if (option && option.type === 'group') {
          const sGroup = settings.find(({ id }) => id === option.id);
          return this.getOption({ options: option.value, settings: sGroup && sGroup.value, token: subtoken })
        }
        return false
      }

      if (option && typeof option.value !== 'undefined') {
        return option.value
      }
      if (Array.isArray(settings)) {
        const defaultOpt = settings.find(setting => setting.id === token)
        if (defaultOpt && typeof defaultOpt.value !== 'undefined') {
          return defaultOpt.value
        }
      }
      return false
    }

    addCss(rule) {
      if (!rule) {
        return
      }
      const css = document.createElement('style')
      const elementToAppend = document.head || document.documentElement
      css.appendChild(document.createTextNode(rule))
      elementToAppend.appendChild(css)
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
