(() => {

  const LSToken = 'vk_markup_crash_options'

  const vk_markup_crash = {

    getStorageDataAsync: function (callback) {
      return new Promise(resolve =>
        chrome.storage.local.get(LSToken, (items) => {
          const storageOptions = items[LSToken]
          if (!storageOptions) {
            return
          }
          resolve(storageOptions)
        })
      )
    },

    processStorageOptions: function (options) {
      if (options) {
        if (this.getOption(options, 'ads')) {
          this.addCss(RULES.ADDS)
        }
        if (this.getOption(options, 'round_icons')) {
          this.addCss(RULES.ROUND_ICONS)
        }
        if (this.getOption(options, 'wide_layout')) {
          this.addCss(RULES.WIDE_LAYOUT)
        }
      }
    },

    getOption: function (options, token) {
      const option = options.find(option => option.id === token)
      return option && option.value
    },

    addCss: function (rule) {
      const css = document.createElement('style')
      css.type = 'text/css'
      css.appendChild(document.createTextNode(rule));
      (document.head || document.documentElement).appendChild(css)
    },

    injectStyle: function () {
      // base styles
      var style = document.createElement('link')
      style.rel = 'stylesheet'
      style.type = 'text/css'
      style.href = chrome.extension.getURL('replacement.css');
      (document.head || document.documentElement).appendChild(style)

      // optioned styles
      this.getStorageDataAsync().then(
        this.processStorageOptions.bind(this)
      )
    },

    isHeader: true,

    processHeader: function (header) {
      var self = this
      window.onscroll = function () {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop
        if (self.isHeader && scrolled > 0) {
          self.isHeader = false
          header.style.display = 'none'
        }
        else if (!self.isHeader && scrolled === 0) {
          self.isHeader = true
          header.style.display = 'block'
        }
      }
    },

    processDOM: function () {
      this.timerId = setInterval(() => {
        var header = document.getElementById('page_header_cont')
        if (header) {
          clearInterval(this.timerId)
          this.processHeader(header)
        }
      }, 75)
    },

    run: function () {
      this.injectStyle()
      this.processDOM()
    }
  }

  vk_markup_crash.run()

})()
