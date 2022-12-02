const Model = require('objection').Model
const knex = require('../config/database')
const Messages = require('./messages')
const Users = require('./users')
Model.knex(knex)

class Conversations extends Model {
    static get tableName() {
        return 'conversations'
    }
    
    static get relationMappings() {
        return {
            messages: {
                relation: Model.HasManyRelation,
                modelClass: Messages,
                join: {
                    from: 'conversations.conversation_id',
                    to: 'messages.conversation_id',
                },
                
            },
        }
    }
}

module.exports = Conversations