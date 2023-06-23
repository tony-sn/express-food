import express from 'express'
import cors from 'cors'
import rootRouter from './routers/rootRouter.js'

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static('.'))

app.listen(8080)

app.use('/api', rootRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api", (req, res) => {
  res.send('This is API endpoint!')
})

app.get("/api/express-food", (req, res) => {
  res.send('Nothing wrong with express-food')
})
