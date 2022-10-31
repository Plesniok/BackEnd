const exampleServiceIstance = require('../service/exampleService')
const {encrypt, decrypt} = require('../safety/crypto')
const logger = require('../scripts/log')

class exampleApi{
    async helloWorld (req, res) {
        let statusCode = 500
        let errorCode = null
        let errorMessage = null
        let resMessage = null

        if(req.validationError){

            errorCode = req.validationError.messageID
            statusCode = req.validationError.code
            errorMessage = req.validationError.errorMessage
        }
        else{
            [statusCode, errorCode,errorMessage, resMessage] = await exampleServiceIstance.example(req.query)
        }
        let resBody = {
            statusCode: statusCode,
            errorCode: errorCode,
            errorMessage: errorMessage,
            responseMessage: resMessage
        }
        logger.info(`${statusCode} - ${errorCode} - ${errorMessage}`)
        res
        .code(statusCode)
        .header('Content-Type', 'application/json')
        .send({payload:encrypt(JSON.stringify(resBody))});
    }
}


module.exports = new exampleApi()