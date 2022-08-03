/* eslint-disable */
// info: Документация Fancybox https://fancyapps.com/docs/ui/quick-start/

import { Fancybox } from '@fancyapps/ui'
import ru from '@fancyapps/ui/src/Fancybox/l10n/ru'

Fancybox.defaults.l10n = ru

window.openModal = name => {
  Fancybox.show([{
    src: name,
    type: 'inline',
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

const modalPhoto = {
  init() {
    this.$el = $('.js-modal-photo')
    this.eventListener()
  },

  eventListener() {
    this.$el.attr('data-fancybox', '')

    Fancybox.bind('[data-fancybox]', {
      Image: {
        zoom: false
      },
      Toolbar: {
        display: [
          { id: 'counter', position: 'left' },
          'close'
        ]
      }
    })
  }
}

class ModalGallery {
  constructor() {
    this.itemClass = '.js-gallery-modal-photo'
    this.eventListener()
  }

  eventListener() {
    Fancybox.bind(this.itemClass, {
      groupAll: true,
      Image: {
        zoom: false
      },
      showClass: 'zoomIn',
      hideClass: 'zoomOut',
      Toolbar: {
        display: [
          { id: 'counter', position: 'left' },
          'close'
        ]
      }
    })
  }
}

class ModalVideo {
  constructor($wrapper) {
    this.$wrapper = $wrapper
  }
}

const initModals = () => {
  modal.init()
  modalPhoto.init()

  $('.js-gallery-modal').each(function() {
    new ModalGallery()
  })

  $('.js-modal-video').each(function() {
    new ModalVideo($(this))
  })
}

export default initModals
