/* eslint-disable no-new */
import Swiper from 'swiper/swiper-bundle.min'

// todo: Пример создания слайдера.
const slider = {
  init() {
    this.slider = '.js-slider'
    this.createSlider()
  },

  createSlider() {
    new Swiper(this.slider, {
      slidersPerView: 2
    })
  }
}

const initSliders = () => {
  slider.init()
}

export default initSliders
