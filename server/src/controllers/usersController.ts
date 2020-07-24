import knex from '../database'

const request = async (req, res) => {
  const results = await knex('users')
  if (results.length === 0) {
    return res.json({ error: 'Sem usuários para mostrar' })
  }

  return res.json(results)
}

const create = async (req, res, next) => {
  try {
    const { name, email } = req.body

    await knex('users').insert({
      name,
      email
    })

    return res.status(201).send()
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params

    const { name, email } = req.body

    await knex('users')
      .update({
        name,
        email
      })
      .where({ id })

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const delet = async (req, res, next) => {
  try {
    const { id } = req.params

    await knex('users').where({ id }).del()

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export default { request, create, update, delet }
