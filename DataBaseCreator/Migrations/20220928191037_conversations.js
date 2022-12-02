/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('conversations', (table) => {
        table.increments('conversation_id').primary()
        table.integer('user_id1').notNull()
        table.integer('user_id2').notNull()
        table.string('user1_nickname')
        table.string('user2_nickname')
        table.string('last_message')
        table.integer('last_sender')
        table.dateTime('last_message_time')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('conversations')
};
