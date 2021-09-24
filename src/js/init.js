/* eslint-disable no-new */
import Slider from './handlers/sliders'

function iniApp() {
	window.$body = $('.js-body')

  window.sliderSettings.forEach((item) => {
    new Slider(item.class, item.settings)
  })

}

export default iniApp
