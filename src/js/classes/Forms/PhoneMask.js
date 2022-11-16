export default class PhoneMask {
  constructor($input) {
    this.$input = $input

    this.eventListeners()
  }

  eventListeners() {
    this.$input.on('input change focus blur', event => {

    })
  }
}
