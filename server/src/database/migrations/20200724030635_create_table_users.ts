/* eslint-disable space-before-function-paren */
import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', table => {
    table.increments('id').notNullable().unique().comment('Id do usuario')
    table.string('name').notNullable().unique().comment('nome do usuario')
    table
      .string('email')
      .notNullable()
      .unique()
      .comment('email/login do usuario')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}
export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('users')
}
