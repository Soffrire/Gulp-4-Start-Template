/**
 * Запуск прелоадера на документ
 */
window.launchWindowPreloader = () => {
  const preloader =
    `
      <div class="wrap-preloader js-wrap-preloader">
        <div class="loader">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    `
  $('body').append(preloader)
}

/**
 * Отключение прелоадера на документ
 * @param callback
 */
window.stopWindowPreloader = (callback = null) => {
  $('.js-wrap-preloader').remove()

  if (callback)
    callback()
}

/**
 * Конвертация значения под русскую локаль
 * @param number
 * @returns {string}
 */
window.numberFormat = (number) => {
  return number.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
}

/**
 * Генерация случайного идентефикатора
 * @returns {string}
 */
window.makeId = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 8; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

/**
 * Получить значение cookie
 * @param name
 * @returns {string|boolean}
 */
window.getCookieValue = (name) => {
  const b = '; ' + document.cookie
  const c = b.split('; ' + name + '=')
  return c.length - 1 ? c.pop().split(';').shift() : false
}

/**
 * Установить cookie
 * @param name
 * @param value
 * @param expires
 * @param path
 * @param domain
 * @param secure
 */
window.setCookie = (name, value, expires, path = '/', domain, secure) => {
  const today = new Date()
  const expiresDefault = new Date()

  expiresDefault.setDate(today.getDate() + 999999)

  expires = expires || expiresDefault
  document.cookie =
    name +
    '=' +
    escape(value) +
    (expires ? '; expires=' + expires : '') +
    (path ? '; path=' + path : '') +
    (domain ? '; domain=' + domain : '') +
    (secure ? '; secure' : '')
}

/**
 * Получить ширину скроллбара документа
 * @returns {number}
 */
window.getScrollWidth = () => {
  const div = document.createElement('div')

  div.style.overflowY = 'scroll'
  div.style.width = '50px'
  div.style.height = '50px'

  div.style.visibility = 'hidden'

  document.body.appendChild(div)
  const scrollWidth = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)

  return scrollWidth
}

/**
 * Прокрутка к элементу страницы
 * @param el
 * @param offset
 */
window.scrollToElement = (el = '.js-document', offset = 30) => {
  $('html, body').animate(
    {
      scrollTop: $(el).offset().top - offset
    },
    500
  )
}

/**
 * Показать список разработчиков проекта
 */
window.showDevelopers = () => {
  class Person {
    constructor(name, development, contact) {
      this.Name = name
      this.Development = development
      this.Contact = contact
    }
  }

  const data = [
    new Person('Столяров Герман', 'front-end', 'Ger6450@gmail.com')
  ]

  console.table(data)
}
