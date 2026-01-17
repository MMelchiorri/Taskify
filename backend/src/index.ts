import express from 'express'
import dotenv from 'dotenv'
import { Router } from 'express'
import routes from './routes'
import { validate } from './middlewares/validate'
import errorHandler from './middlewares/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const router = Router()

app.use(express.json())

routes.forEach((route) => {
  const middlewares = []

  if (route.schema) {
    middlewares.push(validate(route.schema))
  }

  router[route.method](route.path, ...middlewares, route.handler)
})

app.use(router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
