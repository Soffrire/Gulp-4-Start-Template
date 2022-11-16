import initApp from './init'

require('./vendor')
require('./helpers')

// todo: Удалить перед сборкой (build) проекта.
require('./widget')

initApp()
