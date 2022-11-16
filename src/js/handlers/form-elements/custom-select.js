/* eslint-disable no-new */
class CustomSelect {
  constructor($wrapper, type = 'checkbox', callbackFunction) {
    this.$wrapper = $wrapper
    this.$toggle = $wrapper.find('.js-custom-select-toggle')
    this.$optionsList = $wrapper.find('.js-custom-select-list')
    this.$optionsItems = $wrapper.find(`[type='${type}']`)
    this.$selectLabel = $wrapper.find('.js-custom-select-render')

    this.is_open = false
    this.defaultValue = this.$selectLabel.text()

    this.eventHandler()
    this.checkDefaultValue()

    if (callbackFunction)
      callbackFunction(this)

    return this
  }

  eventHandler() {
    const self = this

    this.$toggle.on('click', function () {
      self.toggleShowOptions()
      return false
    })

    this.$optionsItems.on('change', function () {
      self.handlerChangeValue($(this))
    })

    $(document).mouseup(function (e) {
      const el = self.$wrapper
      if (
        !el.is(e.target) &&
        el.has(e.target).length === 0 &&
        self.is_open
      )
        self.toggleShowOptions()
    })
  }

  toggleShowOptions() {
    this.is_open = !this.is_open
    this.$wrapper.toggleClass('custom-select--open')
  }

  handlerChangeValue($input) {
    this.$optionsItems.each(function () {
      const $option = $(this)
      if ($option.val() !== $input.val()) $option.prop('checked', false)
    })

    this.renderSelectedValue($input)
    this.is_open = true
    this.toggleShowOptions()
  }

  renderSelectedValue($input) {
    if ($input.is(':checked')) {
      const text = $input
        .closest('label')
        .find('.custom-select__label')
        .text()
      this.$selectLabel.text(text)
      this.$wrapper.addClass('custom-select--not-default')
    } else {
      this.$selectLabel.text(this.defaultValue)
      this.$wrapper.removeClass('custom-select--not-default')
    }
  }

  checkDefaultValue() {
    const self = this

    this.$optionsItems.each(function () {
      if ($(this).prop('checked'))
        self.renderSelectedValue($(this))
    })
  }
}

export default CustomSelect
