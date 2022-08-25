class exampleService{
    async example (payloadData) {
        let statusCode = 500
        let errorCode = null
        let errorMessage = null
        let resMessage = null
        
        //tutaj validuje z bazy
        statusCode = 200
        errorCode = "01111"
        errorMessage = 'all successful'
        resMessage = payloadData.testNumber + 1
        
        return [statusCode, errorCode, errorMessage, resMessage]
    }
}


module.exports = new exampleService()