try {
	window.$ = window.jQuery = require('jquery')
	require('magnific-popup')
} catch (e) {}

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
