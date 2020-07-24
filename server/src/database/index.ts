import knex from 'knex'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexFile = require('../../knexfile')

export default knex(knexFile.development)
