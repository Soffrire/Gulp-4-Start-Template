import iniApp from './init'

require('./const')
require('./vendor')
require('./helpers')

// info: Файл ui-list.js будет автоматически иключен при сборке проекта.
// removeIf(production)
require('./ui-list')
// endRemoveIf(production)

iniApp()
