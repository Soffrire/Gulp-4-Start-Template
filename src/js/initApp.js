// noinspection JSAnnotator

import initSliders from './handlers/sliders'
import initModals from './handlers/modals'

const initApp = () =>{
  window.$body = $('.js-body') || document.querySelector('.js-body')

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
