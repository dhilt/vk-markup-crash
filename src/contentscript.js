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
        if (this.getOption(options, 'header')) {
          this.processHeader()
        }
        if (this.getOption(options, 'ads')) {
          this.addCss(RULES.ADDS)
        }
        if (this.getOption(options, 'round_icons')) {
          this.addCss(RULES.ROUND_ICONS)
        }
        if (this.getOption(options, 'wide_layout')) {
          this.addCss(RULES.WIDE_LAYOUT)
        }
        if (this.getOption(options, 'margins_and_paddings')) {
          this.addCss(RULES.MARGINS_AND_PADDINGS)
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

    processHeader: function () {
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
    },

    run: function () {
      this.getStorageDataAsync().then(
        this.processStorageOptions.bind(this)
      )
    }
  }

  vk_markup_crash.run()

})()
