/* eslint-disable no-undef */
const formSender = {
  init() {
    this.eventHandler()
  },

  eventHandler() {
    const self = this

    $(document).on('submit', '.js-form-send', function () {
      self.sendRequest($(this))
      return false
    })

    $(document).on('change', '.js-form-consent', function () {
      self.checkConsent($(this))
    })
  },

  sendRequest($form) {
    launchWindowPreloader()

    axios
      .post($form.attr('action'), new FormData($form[0]))
      .then(response => {
        const message = response.data.message
        const customModalSuccess = $form.data('modal-success')

        const isError = response.data.error
        const isResetForm = !!$form.data('reset-form')
        const isRefreshPage = $form.data('refresh-page')
        const isNotShowSuccessMessage = $form.data(
          'not-show-success-message'
        )

        $.magnificPopup.close()

        setTimeout(() => {
          stopWindowPreloader()
          if (isError) return messageError({ title: message })

          const goal = $form.data('goal')
          if (goal) metrics.reachGoal(goal)

          if (isRefreshPage) location.reload()

          if (isResetForm) $form[0].reset()

          if (customModalSuccess)
            return openModal(custom_modal_success)

          if (!isNotShowSuccessMessage)
            messageSuccess({ title: message })
        }, 400)
      })
  },

  checkConsent($input) {
    const isDisabled = !$input.prop('checked')
    const $submit = $input.closest('form').find('[type="submit"]')

    if (isDisabled)
      $submit.attr('disabled', 'disabled')
    else
      $submit.removeAttr('disabled')
  }
}

const initFormSender = () => {
  formSender.init()
}

export default initFormSender
