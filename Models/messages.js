const Model = require('objection').Model
const knex = require('../config/database')

Model.knex(knex)

class Messages extends Model {
    static get tableName() {
        return 'messages'
    }

    
}

module.exports = Messages