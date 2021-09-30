/* eslint-disable no-undef */
window.openModal = name => {
  $.magnificPopup.open({
    items: {
      src: name
    },
    removalDelay: 300,
    mainClass: 'mfp-fade',
    fixedContentPos: true,
    callbacks: {
      beforeOpen: function () {
        $(name)
          .addClass('fade-in-up')
          .removeClass('fade-out-up')
      },
      beforeClose: function () {
        $(name)
          .addClass('fade-out-up')
          .removeClass('fade-in-up')
      }
    }
  })

  return false
}

window.closeModal = () => {
  $.magnificPopup.close()
}

window.message = content => {
  const title = content.title ? content.title : ''
  const description = content.description ? content.description : ''
  $('.js-message-modal-title').html(title)
  $('.js-message-modal-description').html(description)
  openModal('#message-modal')
}

window.messageError = content => {
  const title = content.title ? content.title : ''
  const description = content.description ? content.description : ''
  $('.js-error-modal-title').html(title)
  $('.js-error-modal-description').html(description)
  openModal('#error-modal')
}

window.messageSuccess = content => {
  const title = content.title ? content.title : ''
  const description = content.description ? content.description : ''
  $('.js-success-modal-title').html(title)
  $('.js-success-modal-description').html(description)
  openModal('#success-modal')
}

const modalHandler = {
  init() {
    this.event_handler()
  },

  event_handler() {
    const self = this

    $(document).on('click', '.js-close-modal', function () {
      self.close_modal()
    })

    $(document).on('click', '.js-open-modal', function () {
      const id = $(this).data('modal')

      if (id)
        openModal(id)

      return false
    })

    $(document).on('click', '.js-video-modal', function () {
      const src = $(this).data('video')
      $.magnificPopup.open({
        items: {
          src: src
        },
        disableOn: 700,
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
      })

      return false
    })
  },

  close_modal() {
    $.magnificPopup.close()
  }
}

const modalGallery = {
  init() {
    this.event_handler()
  },

  event_handler() {
    $('.js-modal-gallery').each(function () {
      $(this).magnificPopup({
        delegate: '.js-modal-gallery-photo',
        type: 'image',
        tLoading: 'Загрузка изображения #%curr%...',
        mainClass: 'mfp-fade modal-gallery',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
          arrowMarkup:
            '<div class="modal-gallery__arrow modal-gallery__arrow-%dir% js-modal-gallery-arrow"><svg class="icon icon-%dir% modal-gallery__arrow-icon"><use xlink:href="#%dir%"></use></svg><div>'
        },
        image: {
          tError:
            '<a href=" % url % ">Изображение #%curr%</a> не может быть загружено.',
          titleSrc: function (item) {
            return item.el.attr('title')
          }
        }
      })
    })

    $('.js-modal-photo').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      image: {
        verticalFit: false
      },
      mainClass: 'mfp-fade modal-gallery'
    })
  }
}

const initModals = () => {
  modalHandler.init()
  modalGallery.init()
}

export default initModals
