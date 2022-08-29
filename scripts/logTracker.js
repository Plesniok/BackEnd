const logger = require('./log')
const crypto = require('crypto')

const logTracker = (req, res, next) => {
    //req.loggerID = crypto.randomUUID()
    //logger.info(`${req.loggerID} - ${req.path} - ${req.method} - ${req.body.payload || req.query.payload}`)
    //return next()
}

module.exports = logTracker