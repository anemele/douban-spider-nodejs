const log = require('log4js')

const globalLogger = log.getLogger('douban')
globalLogger.level = 'info'
module.exports = globalLogger
