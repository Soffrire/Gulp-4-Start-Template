import initApp from './initApp'
import initBackendScripts from './backend/initBackendScripts'

import './global/vendor'
import './global/helpers'
import './global/widget'

document.addEventListener('DOMContentLoaded', () => {
	initApp()
	initBackendScripts()
})
