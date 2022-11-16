export default class FormSender {
  constructor($form) {
    this.$form = $form
    this.$submit = this.$form.find(`[type='submit']`)
    this.$consentCheckbox = this.$form.find(`[name='consent']`)

    this.eventListeners()
  }

  eventListeners() {
    this.$consentCheckbox.closest('label').on('change', () => {
      this.consentcheck()
    })

    this.$form.on('submit', () => {
      this.sendRequest(this.$form)

      return false
    })
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
      .catch(() => {
        stopWindowPreloader()

        messageSuccess({
          title: 'Что-то пошло не так',
          message: 'При отправке запроса произошла ошибка'
        })
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
    const isDisabled = !this.$consentCheckbox.prop('checked')

    isDisabled
      ? this.$submit.attr('disabled', 'disabled')
      : this.$submit.removeAttr('disabled')
  }
}
