const usersServiceIstance = require('../service/usersService')
const {encrypt, decrypt} = require('../safety/crypto')
const logger = require('../scripts/log')

class usersApi{
    async addUser (req, res) {
        try{
        console.log(req.body.payload)
        let statusCode = 500
        let errorCode = null
        let errorMessage = null
        let resMessage = null

        if(req.validationError){
            console.log(req.validationError)
            errorCode = req.validationError.messageID
            statusCode = req.validationError.code
            errorMessage = req.validationError.errorMessage
            console.log(errorCode, errorMessage)
        }
        else{
            
            [statusCode, errorCode,errorMessage, resMessage] = await usersServiceIstance.addUser(req.body)
        }
        let resBody = {
            statusCode: statusCode,
            errorCode: errorCode,
            errorMessage: errorMessage,
            responseMessage: resMessage
        }
        console.log(resBody)
        logger.info(`${statusCode} - ${errorCode} - ${errorMessage}`)
        res
        .code(statusCode)
        .header('Content-Type', 'application/json')
        .send({payload:encrypt(JSON.stringify(resBody))});
    }
    catch(err){
        console.log(err)
    }
    }
    async getUser (req, res) {
        let statusCode = 500
        let errorCode = null
        let errorMessage = null
        let resMessage = null

        if(req.validationError){
            
            errorCode = req.validationError.messageID
            statusCode = req.validationError.code
            errorMessage = req.validationError.errorMessage
            console.log(errorCode, errorMessage)
            console.log('wrong valid')
        }
        else{
            [statusCode, errorCode,errorMessage, resMessage] = await usersServiceIstance.getUser(req.query)
        }
        let resBody = {
            statusCode: statusCode,
            errorCode: errorCode,
            errorMessage: errorMessage,
            responseMessage: resMessage
        }
        logger.info(`${statusCode} - ${errorCode} - ${errorMessage}`)
        console.log('<<<<<<<<<<<<<<<<<<response>>>>>>>>>>>>>>>>>>')
        console.log(resBody)
        console.log('<<<<<<<<<<<<<<<<<<response>>>>>>>>>>>>>>>>>>')

        res
        .code(statusCode)
        .header('Content-Type', 'application/json')
        .send({payload:encrypt(JSON.stringify(resBody))});
    }
}


module.exports = new usersApi()