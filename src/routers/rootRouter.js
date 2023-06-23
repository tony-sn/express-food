import express from 'express'
import restaurantRouter from './restaurantRouter.js'

const rootRouter = express.Router()

// endpoint for restaurant
rootRouter.use("/express-food", restaurantRouter)

export default rootRouter
