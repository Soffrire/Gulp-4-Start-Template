/* eslint-disable */
import { Fancybox } from '@fancyapps/ui'

window.openModal = name => {
  Fancybox.show([{
    src: name,
    type: 'inline',
    mainClass: 'modal'
  }])
}

window.closeModal = () => {
  Fancybox.close()
}

window.message = content => {
  const title = content.title ? content.title : ''
  const description = content.description ? content.description : ''

  $('.js-message-modal-title').html(title)
  $('.js-message-modal-description').html(description)

  openModal('#message-modal')
}

window.messageSuccess = content => {
  const title = content.title ? content.title : ''
  const description = content.description ? content.description : ''

  $('.js-success-modal-title').html(title)
  $('.js-success-modal-description').html(description)

  openModal('#success-modal')
}

window.messageError = content => {
  const title = content.title ? content.title : ''
  const description = content.description ? content.description : ''

  $('.js-error-modal-title').html(title)
  $('.js-error-modal-description').html(description)

  openModal('#error-modal')
}

const modal = {
  init() {
    this.eventListeners()
  },

  eventListeners() {

    $(document).on('click', '.js-open-modal', event => {
      const modalId = $(event.target).data('modal')

      if (modalId)
        openModal(modalId)

      return false
    })

    $(document).on('click', '.js-close-modal', () => {
      closeModal()

      return false
    })

  }
}

class ModalGallery {
  constructor($wrapper) {
    this.$wrapper = $wrapper
  }
}

class ModalVideo {
  constructor($wrapper) {
    this.$wrapper = $wrapper
  }
}

const initModals = () => {
  modal.init()

  $('.js-gallery-modal').each(function() {
    new ModalGallery($(this))
  })

  $('.js-modal-video').each(function() {
    new ModalVideo($(this))
  })
}

export default initModals
