import express from 'express'
import dotenv from 'dotenv'
const app = express()
import { Router } from 'express'
import routes from './routes'
import { validate } from './middlewares/validate'
dotenv.config()

const PORT = process.env.PORT || 3000

const router = Router()

app.use(express.json())

routes.forEach((route) =>
  router[route.method](
    route.path,
    ...(route.schema ? [validate(route.schema)] : []),
    route.service,
  ),
)


app.use(router)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
