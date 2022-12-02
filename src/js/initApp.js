import initSliders from './handlers/sliders'
import initModals from './handlers/modals'
import FormSender from './classes/Forms/FormSender'
import Select from './classes/Forms/Select'

const initApp = () => {
  window.$body = $('.js-body')

  document
    .querySelectorAll('.js-send-form')
    .forEach(form => new FormSender(form))

  document
    .querySelectorAll('.js-select')
    .forEach(select => new Select(select, 'checkbox', null))

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
