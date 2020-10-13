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

    makeSelect(option) {
      const options = option.values.map(item => `
        <option
          value="${item}"
          ${option.value === item ? 'selected' : ''}
        >${item}</option>
      `).join('');
      return `
    	<select
    		name="${option.id}"
        id="${option.id}"
      >${options}</select>`
    }

    makeInput(option) {
      switch (option.type) {
        case 'select':
          return this.makeSelect(option)
        case 'checkbox':
          return this.makeCheckbox(option)
      }
    }

    makeInputs(inputs, group = null) {
      return inputs
        .filter(input => !input.hidden)
        .map(input => input.type === 'group'
          ? `<div class="group">` +
            this.makeInputs(input.value, input) +
            `</div>`
          : `<div class="item">`+
            this.makeInput(group
              ? { ...input, id: group.id + '_' + input.id }
              : input
            ) +
            `</div>`
        ).join('')
    }

    setOptionsHTML() {
      const optionsElement = document.getElementById('options')
      if (!optionsElement) {
        return
      }
      optionsElement.innerHTML = this.makeInputs(this.settings)
    }

    setOptionListener(element, option) {
      if (option.type === 'checkbox') {
        element.addEventListener('click', () => {
          option.value = !option.value
          this.saveOptions()
        })
      } else if (option.type === 'select') {
        element.addEventListener('change', () => {
          option.value = element.value
          this.saveOptions()
        })
      }
    }

    setOptionsListeners(settings, group = null) {
      settings
        .filter(option => !option.hidden)
        .forEach(option => {
          if (option.type === 'group') {
            this.setOptionsListeners(option.value, option)
            return
          }
          const optionId = (group ? group.id + '_' : '') + option.id
          const element = document.getElementById(optionId)
          if (!element) {
            console.warn(`vk_markup_crash: options element not found (${optionId})`)
            return
          }
          this.setOptionListener(element, option)
        })
    }

    run() {
      this.initializeOptionList()
      this.setOptionsHTML()
      this.setOptionsListeners(this.settings)
    }

  }

  const vk_markup_crash_options = new VK_MARKUP_CRASH_OPTIONS(SHARED, localStorage)
  vk_markup_crash_options.run()

})()
