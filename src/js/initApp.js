import initSliders from './handlers/sliders'
import initModals from './handlers/modals'
import FormSender from './classes/Forms/FormSender'

const initApp = () => {
  window.$body = $('.js-body')

  $('.js-send-form').each(function() {
    new FormSender($(this))
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
