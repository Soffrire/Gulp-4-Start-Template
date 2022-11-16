import Select from './Select'

export default class SelectMultiple extends Select {
  constructor($select, type = 'checkbox', callback) {
    super($select, type = 'radio', callback)

    this.$select = $select
    this.$inputs = this.$select.find(`[type='${type}']`)

    if (callback)
      callback()

    this.eventListeners()
  }

  eventListeners() {
    
  }
}
