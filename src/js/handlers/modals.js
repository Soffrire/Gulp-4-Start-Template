/**
 * Глобальная функция вызова модального окна.
 * @String id - идентификатор модального окна.
 */
window.openModal = id => {
  console.log(id)
}

/**
 * Глобальная функция закрытия модального(-ных) окна(-он).
 */
window.closeModal = () => {
  return false
}

/**
 * Глобальная функция вызова модального окна с текстом об успехе.
 * @String title - заголовок в модальном окне.
 * @String message - текст сообщения в модальном окне.
 * @param content
 */
window.messageSuccess = (content = {}) => {
  const title = content.title || ''
  const message = content.message || ''

  $('.js-modal-success-title').html(title)
  $('.js-modal-success-message').html(message)

  openModal('#modal-success')
}

/**
 * Глобальная функция вызова модального окна с текстом об ошибке.
 * @String title - заголовок в модальном окне.
 * @String message - текст сообщения в модальном окне.
 * @param content
 */
window.messageError = (content = {}) => {
  const title = content.title || ''
  const message = content.message || ''

  $('.js-modal-error-title').html(title)
  $('.js-modal-error-message').html(message)

  openModal('#modal-success')
}

/**
 * Обработчик клика на элементы для открытия модального окна.
 */
class ModalHandler {
  constructor($element) {
    this.$element = $element
    this.$modalID = this.$element.data('modal-id')

    this.eventListener()
  }

  eventListener() {
    this.$element.on('click', () => {
      if (this.$modalID !== '') {
        openModal(this.$modalID)
      }
    })
  }
}

/**
 * Обработчик модального окна с галерей изображений.
 */
class ModalGallery {
  constructor($wrapper) {
    this.$wrapper = $wrapper
    this.$items = this.$wrapper.find('.js-modal-gallery-item')

    this.eventListeners()
  }

  eventListeners() {}
}

/**
 * Функция инициализации всех модальных окон.
 */
const initModals = () => {
  $('.js-open-modal').each(function() {
    new ModalHandler($(this))
  })

  $('.js-modal-gallery').each(function() {
    new ModalGallery($(this))
  })
}

export default initModals
