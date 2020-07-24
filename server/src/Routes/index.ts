import express from 'express'
import UserController from '../controllers/usersController'

const router = express.Router()

router
  // get users
  .get('/users', UserController.request)
  // insert new user
  .post('/users', UserController.create)
  // edit user
  .put('/users/:id', UserController.update)
  // delete user
  .delete('/users/:id', UserController.delet)

export default router
