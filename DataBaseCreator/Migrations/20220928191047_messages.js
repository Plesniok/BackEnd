/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', (table) => {
        table.increments('message_id').primary()
        table.integer('conversation_id').notNull()
        table.integer('user_id').notNull()
        table.string('content')
        table.dateTime('message_time')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages')
};

