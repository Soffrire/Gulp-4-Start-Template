const addInputMaskPhone = () => {
  $(document)
    .on('input', '.js-input-phone', maskPhone)
    .on('focus', '.js-input-phone', maskPhone)
    .on('blur', '.js-input-phone', maskPhone)
    .on('keydown', '.js-input-phone', maskPhone)
}

let keyCode

function maskPhone(event) {
  event.keyCode && (keyCode = event.keyCode)

  var pos = this.selectionStart
  if (pos < 3) event.preventDefault()

  const matrix = '+7 (___) ___-__-__'
  let i = 0
  const def = matrix.replace(/\D/g, '')
  const val = this.value.replace(/\D/g, '')

  let newValue = matrix.replace(/[_\d]/g, function (a) {
    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
  })

  i = newValue.indexOf('_')
  if (i !== -1) {
    i < 5 && (i = 3)
    newValue = newValue.slice(0, i)
  }

  var reg = matrix
    .substr(0, this.value.length)
    .replace(/_+/g, function (a) {
      return '\\d{1,' + a.length + '}'
    })
    .replace(/[+()]/g, '\\$&')

  reg = new RegExp('^' + reg + '$')

  if (
    !reg.test(this.value) ||
    this.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  )
    this.value = newValue

  if (event.type === 'focusout' && this.value.length < 18) this.value = ''
}

export default addInputMaskPhone
