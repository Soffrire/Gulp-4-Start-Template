import General from '../../global/General'

export default class Select extends General {
  constructor($select, type = 'radio', callback) {
    super()
    this.type = type
    this.$select = $select
    this.$button = this.$select.find('.js-select-button')
    this.$body = this.$select.find('.js-select-body')
    this.$inputs = this.$select.find(`[type='${this.type}']`)
    this.$text = this.$select.find('.js-select-current')
    this.defaultText = this.$text.text()

    this.isOpen = false

    if (callback)
      callback()

    this.eventListeners()
  }

  eventListeners() {
    this.$button.on('click', () => this.toggleOptions())

    $(document).mouseup((event) => {
      if (this.checkTargets(this.$body, this.$button, event.target)) this.close()
    })

    this.$inputs.on('change', event => {
      this.setCurrentValue($(event.currentTarget))
    })
  }

  toggleOptions() {
    this.isOpen = !this.isOpen

    this.isOpen
      ? this.open()
      : this.close()
  }

  open() {
    this.$select.addClass('open')
  }

  close() {
    this.$select.removeClass('open')

    this.isOpen = false
  }

  setCurrentValue($input) {
    const text = $input.val()

    this.$inputs.not($input).prop('checked', false)

    $input.is(':checked')
      ? this.$text.text(text)
      : this.setDefault()

    this.close()
  }

  reset() {
    this.$inputs.prop('checked', false)
    this.setDefault()
  }

  setDefault() {
    this.$text.text(this.defaultText)
  }
}
