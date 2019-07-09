(() => {

  class VK_MARKUP_CRASH_OPTIONS {

    constructor({ SETTINGS, CONFIG: { LS_TOKEN } }, localStorage) {
      this.settings = SETTINGS
      this.lsToken = LS_TOKEN
      this.LS = localStorage
    }

    saveOptions() {
      this.LS[this.lsToken] = JSON.stringify(this.settings)
      chrome.storage.local.set({
        [this.lsToken]: this.settings
      })
    }

    initializeOptionList() {
      let ls
      if (this.LS[this.lsToken]) {
        ls = JSON.parse(this.LS[this.lsToken])
      }
      if (ls && ls.length) {
        ls.forEach(opt => {
          const option = this.settings.find(_opt => opt.id === _opt.id)
          if (option) {
            option.value = opt.value
          }
        })
      }
      this.saveOptions();
    }

    makeCheckbox(option) {
      return `
    	<input type="checkbox" value="1"
    		${option.value ? 'checked' : ''} 
    		name="${option.id}"
    		id="${option.id}" />
    	<span> - ${option.text}</span>`
    }

    makeInput(option) {
      switch (option.type) {
        default:
          return this.makeCheckbox(option)
      }
    }

    setOptionsHTML() {
      const optionsElement = document.getElementById('options')
      if (!optionsElement) {
        return
      }
      optionsElement.innerHTML = this.settings
        .filter(option => !option.hidden)
        .map(option => `<div>` + this.makeInput(option) + `</div>`).join('')
    }

    setOptionsListeners() {
      this.settings
        .filter(option => !option.hidden)
        .forEach(option => {
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
    }

    run() {
      this.initializeOptionList()
      this.setOptionsHTML()
      this.setOptionsListeners()
    }

  }

  const vk_markup_crash_options = new VK_MARKUP_CRASH_OPTIONS(SHARED, localStorage)
  vk_markup_crash_options.run()

})()
