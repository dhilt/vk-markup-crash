(() => {

  const { SETTINGS, CONFIG: { LS_TOKEN } } = SHARED
  const LS = localStorage

  const vk_markup_crash_options = {

    saveOptions: function () {
      LS[LS_TOKEN] = JSON.stringify(SETTINGS)
      chrome.storage.local.set({
        [LS_TOKEN]: SETTINGS
      })
    },

    initializeOptionList: function () {
      let ls
      if (LS[LS_TOKEN]) {
        ls = JSON.parse(LS[LS_TOKEN])
      }
      if (ls && ls.length) {
        ls.forEach(opt => {
          const option = SETTINGS.find(_opt => opt.id === _opt.id)
          if (option) {
            option.value = opt.value
          }
        })
      }
      this.saveOptions();
    },

    makeCheckbox: function (option) {
      return `
    	<input type="checkbox" value="1"
    		${option.value ? 'checked' : ''} 
    		name="${option.id}"
    		id="${option.id}" />
    	<span> - ${option.text}</span>`
    },

    makeInput: function (option) {
      switch (option.type) {
        default:
          return this.makeCheckbox(option)
      }
    },

    setOptionsHTML: function () {
      const optionsElement = document.getElementById('options')
      if (!optionsElement) {
        return
      }
      optionsElement.innerHTML =
        SETTINGS.map(option => `<div>` + this.makeInput(option) + `</div>`).join('')
    },

    setOptionsListeners: function () {
      SETTINGS.forEach(option => {
        const element = document.getElementById(option.id)
        if (!element) {
          console.warn(`vk_markup_crash: options element not found (${option.id})`)
          return
        }
        element.addEventListener('click', () => {
          if (option.type === 'checkbox') {
            option.value = !option.value
          }
          this.saveOptions()
        })
      })
    },

    run: function () {
      this.initializeOptionList()
      this.setOptionsHTML()
      this.setOptionsListeners()
    }

  }

  vk_markup_crash_options.run()

})()
