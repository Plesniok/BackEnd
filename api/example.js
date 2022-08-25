const exampleServiceIstance = require('../service/exampleService')
const {encrypt, decrypt} = require('../safety/crypto')

class exampleApi{
    async helloWorld (req, res) {
        let statusCode = 500
        let errorCode = null
        let errorMessage = null
        let resMessage = null

        if(req.validationError){
            statusCode = req.validationError.code
            errorMessage = req.validationError.errorMessage
        }
        else{
            [statusCode, errorCode,errorMessage, resMessage] = await exampleServiceIstance.example(req.query)
            console.log(statusCode, errorMessage, resMessage)
            //console.log(resMessage,'dadas')
        }
        //resBody = enc(JSON.stringify(resBody))
        let resBody = {
            errorCode: errorCode,
            errorMessage: errorMessage,
            responseMessage: resMessage
        }
        console.log(resBody)
        res
        .code(statusCode)
        .header('Content-Type', 'application/json')
        .send({payload:encrypt(JSON.stringify(resBody))});
    }
}


module.exports = new exampleApi()