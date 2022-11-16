export default class FormSender {
  constructor($form) {
    this.$form = $form
    this.$submit = this.$form.find(`[type='submit']`)
    this.$consentCheckbox = this.$form.find('.js-consent-checkbox')
  }

  /**
   * Отправка запроса.
   */
  sendRequest($form) {
    const url = $form.attr('action')
    const formData = this.getFormData($form)

    launchWindowPreloader()

    axios
      .post(url, formData)
      .then(response => {
        const requestTitle = response.data.title
        const requestMessage = response.data.message

        stopWindowPreloader()

        if (requestTitle || requestMessage) {
          messageSuccess({
            title: requestTitle,
            message: requestMessage
          })
        }
      })
      .catch(error => {
        const requestTitle = error.data.title
        const requestMessage = error.data.message

        stopWindowPreloader()

        if (requestTitle || requestMessage) {
          messageError({
            title: requestTitle,
            message: requestMessage
          })
        }
      })
  }

  /**
   * Получение объекта FormData для отправки данных формы.
   * @param $form
   * @returns {FormData}
   */
  getFormData($form) {
    return new FormData($form[0])
  }

  /**
   * Проверка активности на согласие с обработкой данных.
   */
  consentcheck() {
    this.$consentCheckbox = !this.$consentCheckbox.prop('checked')

    this.$consentCheckbox
      ? this.$submit.removeAttr('disabled')
      : this.$submit.attr('disabled', 'disabled')
  }
}
