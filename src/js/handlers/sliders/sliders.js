/* eslint-disable no-new */
import './sliders-settings'
import Swiper from 'swiper/swiper-bundle.min'

const sliders = window.sliderSettings

class Slider {
  constructor(selector, settings) {
    this.slider = selector
    this.settings = settings
    this.eventHandler()
  }

  eventHandler() {
    new Swiper(this.slider, this.settings)
  }
}

const initSliders = () => {
  sliders.forEach((item) => {
    new Slider(item.class, item.settings)
  })
}

export default initSliders
