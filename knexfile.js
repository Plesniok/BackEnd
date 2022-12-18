// Update with your config settings.
const rootDir = require('path').resolve('./');
require('dotenv').config({ path: rootDir + '/config/.env' })
const types = require('pg').types
const TIMESTAMPTZ_OID = 1184
const TIMESTAMP_OID = 1114
types.setTypeParser(TIMESTAMPTZ_OID, (val) => val)
types.setTypeParser(TIMESTAMP_OID, (val) => val)
module.exports = {
    test: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_NAME_TEST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            
        },
        migrations: {
            tableName: 'migrations',
            directory: './DataBaseCreator/Migrations',
        },
        seeds: {
            directory: './DataBaseCreator/Seeds',
        },
    },

    development: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            
        },
        migrations: {
            tableName: 'migrations',
            directory: './DataBaseCreator/Migrations',
        },
        seeds: {
            directory: './DataBaseCreator/Seeds',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            
        },
        migrations: {
            tableName: 'migrations',
            directory: './DataBaseCreator/Migrations',
        },
        seeds: {
            directory: './DataBaseCreator/Seeds',
        },
    },
}