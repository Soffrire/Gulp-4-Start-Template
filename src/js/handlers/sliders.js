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
      slidesPerView: 3,
      spaceBetween: 20,
      autoplay: {
        delay: 5000
      }
    })
  }
}

const initSliders = () => {
  slider.init()
}

export default initSliders
