const Model = require('objection').Model
const knex = require('../config/database')
const Conversations = require('./conversations')
Model.knex(knex)

class Users extends Model {
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        return {
            conversations: {
                relation: Model.HasManyRelation,
                modelClass: Conversations,
                join: {
                    from: 'users.user_id',
                    to: 'conversations.user_id2',
                }
            },
            conversations: {
                relation: Model.HasManyRelation,
                modelClass: Conversations,
                join: {
                    from: 'users.user_id',
                    to: 'conversations.user_id1',
                }
            },
        }
    }
}

module.exports = Users