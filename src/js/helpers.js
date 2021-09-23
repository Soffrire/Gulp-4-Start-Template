window.dump = (value) => {
	console.dir(value)
}

window.numberFormat = (number) => {
	return number.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
}

window.makeId = () => {
	let text = ''
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (let i = 0; i < 8; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

window.getCookieValue = (name) => {
	const b = '; ' + document.cookie
	const c = b.split('; ' + name + '=')
	return c.length - 1 ? c.pop().split(';').shift() : false
}

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

window.scrollToElement = (el = '.header') => {
	$('html, body').animate(
		{
			scrollTop: $(el).offset().top - 30
		},
		500
	)
}

window.launchWindowPreloader = () => {
	var html =
		'<div class="wrap-preloader js-wrap-preloader"><div class="loader"><div class="circle"></div></div></div>'
	$('body').append(html)
}

window.stopWindowPreloader = (callback = null) => {
	$('.js-wrap-preloader').remove()
}

window.showDevelopers = () => {
	class Person {
		constructor(name, development, contact) {
			this.Name = name
			this.Development = development
			this.Contact = contact
		}
	}

	const data = [new Person('Василий Коркин', 'front-end, back-end', 'v.ivan.korkin@gmail.com')]
	console.table(data)
}
