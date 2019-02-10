(() => {

  const LS = localStorage
  const LSToken = 'vk_markup_crash_options'

  const vk_markup_crash_options = {

    options: [{
      id: 'ads',
      type: 'checkbox',
      value: true,
      text: 'remove ads'
    }, {
      id: 'round_icons',
      type: 'checkbox',
      value: true,
      text: 'abandon round icons'
    }],

    saveOptions: function () {
      LS[LSToken] = JSON.stringify(this.options)
      chrome.storage.local.set({
        [LSToken]: this.options
      })
    },

    initializeOptionList: function () {
      let ls
      if (LS[LSToken]) {
        ls = JSON.parse(LS[LSToken])
      }
      if (ls && ls.length) {
        ls.forEach(opt => {
          const option = this.options.find(_opt => opt.id === _opt.id)
          if (option) {
            option.value = opt.value
          }
        })
      } else {
        this.saveOptions();
      }
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
        this.options.map(option => `<div>` + this.makeInput(option) + `</div>`).join('')
    },

    setOptionsListeners: function () {
      this.options.forEach(option => {
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
