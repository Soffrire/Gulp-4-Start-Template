import initSliders from './handlers/sliders'
import initModals from './handlers/modals'
import FormSender from './classes/Forms/FormSender'
import Select from './classes/Forms/Select'

const initApp = () => {
  window.$body = $('.js-body')

  $('.js-send-form').each(function() {
    new FormSender($(this))
  })

  $('.js-select').each(function() {
    new Select($(this), 'checkbox', null)
  })

  /**
   * Инициализация слайдеров
   */
  initSliders()

  /**
   * Инициализация модальных окон
   */
  initModals()
}

export default initApp
