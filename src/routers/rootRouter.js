import express from 'express';
import restaurantRouter from './restaurantRouter.js';
import userRouter from './userRouter.js';

const rootRouter = express.Router();

rootRouter.use('/restaurants', restaurantRouter);
rootRouter.use('/users', userRouter);

export default rootRouter;
