/* eslint-disable no-new */
import addInputMaskPhone from './handlers/form-elements/phone-mask'
import initModals from './handlers/modals'
import initSliders from './handlers/sliders/sliders'
import initFormSender from './handlers/form-elements/form-sender'
import CustomSelect from './handlers/form-elements/custom-select'
import MultipleCustomSelect from './handlers/form-elements/multiple-custom-select'

function iniApp() {
  window.$body = $('.js-body')

  $('.js-custom-select').each(function () {
    new CustomSelect($(this))
  })

  $('.js-custom-multiple-select').each(function () {
    new MultipleCustomSelect($(this))
  })

  addInputMaskPhone()

  initModals()

  initSliders()

  initFormSender()

}

export default iniApp
