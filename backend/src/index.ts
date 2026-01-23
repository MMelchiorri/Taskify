import express from 'express'
import dotenv from 'dotenv'
import router from './routes'
import errorHandler from './middlewares/errorHandler'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
