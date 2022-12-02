const knex = require('../config/database')
const Users = require('../Models/users')
const Conversations = require('../Models/conversations')
const Messages = require('../Models/messages')
const conversations = require('../api/conversations')

class ConversationsServices{
    
    // async addUser (payloadData) {
    //         let statusCode = 500
    //         let errorCode = null
    //         let errorMessage = null
    //         let resMessage = null
    //         // console.log(payloadData, 'dadsadsa')
    //         let ifUserExists = await Users.query()
    //         .where('email', payloadData.email);
    //         if(ifUserExists.length == 0) {
    //             await Users.transaction(async (trx) => {
    //                 await Users.query(trx)
    //                     .insert({
    //                         email: payloadData.email,
    //                         password: payloadData.password,
    //                         user_name: payloadData.userName
    //                     })
    //                     .returning('user_id')
                    
    //             })

    //             statusCode = 200
    //             errorCode = "01111"
    //             errorMessage = 'all successful'
    //             resMessage = payloadData.email
                


    //         }
    //         else{
    //             statusCode = 400
    //             errorCode = "01010"
    //             errorMessage = 'User already exists'
    //         }
    //         return [statusCode, errorCode, errorMessage, resMessage]
    // }

    async getConversations (payloadData) {
        let statusCode = 500
        let errorCode = null
        let errorMessage = null
        let resMessage = null
        

        let ifConversationExists = await Conversations.query()
        .where('conversations.user_id1', payloadData.userId)
        .orWhere('conversations.user_id2', payloadData.userId)
        .select(
            knex.raw(`(case when last_sender = ${payloadData.userId} then 'user' else 'friend' end) as last_sender`),
            
            'conversations.last_message',
            'conversations.conversation_id',
            'conversations.last_message_time',
            knex.raw(`(case when user_id1 = ${payloadData.userId} then user2_nickname else user1_nickname end) as friend`)
        )
        

        console.log(ifConversationExists)
        // console.log(conversations[0].conversations, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                statusCode = 200
                errorCode = "01111"
                errorMessage = 'all successful'
                resMessage = ifConversationExists
        
        return [statusCode, errorCode, errorMessage, resMessage]
    }
}


module.exports = new ConversationsServices()