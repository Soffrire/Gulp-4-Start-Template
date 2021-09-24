/* eslint-disable no-new */
import Swiper from 'swiper/swiper-bundle'

export default class Slider {
  constructor(selector, settings) {
    this.slider = selector
    this.settings = settings
    this.eventHandler()
  }

  eventHandler() {
    new Swiper(this.slider, this.settings)
  }
}
