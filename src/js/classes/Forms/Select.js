export default class Select {
  constructor($select, type = 'radio', callback) {
    this.$select = $select
    this.$inputs = this.$select.find(`[type='${type}']`)

    if (callback)
      callback()

    this.eventListeners()
  }

  eventListeners() {}
}
