import express from 'express'
import cors from 'cors'
import routes from './Routes'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(3000, () => {
  console.log('Server running')
})
