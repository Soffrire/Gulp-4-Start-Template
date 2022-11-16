/* eslint-disable no-new */
import CustomSelect from './custom-select'

class MultipleCustomSelect extends CustomSelect {
  handlerChangeValue() {
    this.renderSelectedValue()
  }

  renderSelectedValue() {
    let countSelectOptions = 0

    this.$optionsItems.each(function () {
      if ($(this).prop('checked')) countSelectOptions++
    })

    if (countSelectOptions > 0) {
      this.$selectLabel.text(
        `${this.defaultValue} (${countSelectOptions})`
      )
      this.$wrapper.addClass('custom-select--not-default')
    } else {
      this.$selectLabel.text(this.defaultValue)
      this.$wrapper.removeClass('custom-select--not-default')
    }
  }
}

export default MultipleCustomSelect
