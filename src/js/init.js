/* eslint-disable no-new */
import addInputMaskPhone from './handlers/form-elements/phone-mask'
import initModals from './handlers/modals'
import initSliders from './handlers/sliders'
import initFormSender from './handlers/form-elements/form-sender'
import CustomSelect from './handlers/form-elements/custom-select'
import MultipleCustomSelect from './handlers/form-elements/multiple-custom-select'

function initApp() {
  window.$body = $('.js-body')

  /**
   * Обработчик списков выбора.
   */
  $('.js-custom-select').each(function () {
    new CustomSelect($(this))
  })

  /**
   * Обработчик множественного списка выбора.
   */
  $('.js-custom-multiple-select').each(function () {
    new MultipleCustomSelect($(this))
  })

  /**
   * Иннициализация маски для полей номера телефона.
   */
  addInputMaskPhone()

  /**
   * Иннициализация модальных окон.
   */
  initModals()

  /**
   * Иннициализация слайдеров.
   */
  initSliders()

  /**
   * Иннициализация обработчика отправки форм.
   */
  initFormSender()

}

export default initApp
