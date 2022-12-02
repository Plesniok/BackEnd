const Users = require('../Models/users')
const Conversations = require('../Models/conversations')
const Messages = require('../Models/messages')

class usersService{
    
    async addUser (payloadData) {
            let statusCode = 500
            let errorCode = null
            let errorMessage = null
            let resMessage = null
            // console.log(payloadData, 'dadsadsa')
            let ifUserExists = await Users.query()
            .where('email', payloadData.email);
            if(ifUserExists.length == 0) {
                await Users.transaction(async (trx) => {
                    await Users.query(trx)
                        .insert({
                            email: payloadData.email,
                            password: payloadData.password,
                            user_name: payloadData.userName
                        })
                        .returning('user_id')
                    
                })

                statusCode = 200
                errorCode = "01111"
                errorMessage = 'all successful'
                resMessage = payloadData.email
                


            }
            else{
                statusCode = 400
                errorCode = "01010"
                errorMessage = 'User already exists'
            }
            return [statusCode, errorCode, errorMessage, resMessage]
    }

    async getUser (payloadData) {
        let statusCode = 500
        let errorCode = null
        let errorMessage = null
        let resMessage = null
        console.log(payloadData, "<<<<<<<<<")
        let ifUserExists = await Users.query()
        .where('email', payloadData.email)
        console.log(ifUserExists)
        if(ifUserExists.length > 0) {
            

            if(ifUserExists[0].password == payloadData.password){
                statusCode = 200
                errorCode = "01111"
                errorMessage = 'all successful'
                resMessage = ifUserExists[0]
            }
            else{
                statusCode = 400
                errorCode = "01010"
                errorMessage = 'Wrong password'
                resMessage = payloadData.email
            }
        }
        else{
            console.log(payloadData)
            statusCode = 400
            errorCode = "01011"
            errorMessage = 'User does not exist'
        }
        return [statusCode, errorCode, errorMessage, resMessage]
    }
}


module.exports = new usersService()