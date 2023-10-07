import express from 'express';
import {
  getOrder,
  getReviews,
  getLikesAndUnlikes,
  postReview,
  postOrder,
} from '../controllers/userController.js';

const userRouter = express.Router();

// Get likes and unlikes for a user
userRouter.get('/:userId/getLikesAndUnlikes', async (req, res) => {
  const { userId } = req.params;
  const result = await getLikesAndUnlikes(res, userId);
  res.send(result);
});

// Post a review for a restaurant
userRouter.post('/:userId/postReview/:restaurantId', async (req, res) => {
  const { userId, restaurantId } = req.params;
  const review = req.body.review;
  const result = await postReview(res, userId, restaurantId, review);
  res.send(result);
});

// Get reviews for a user
userRouter.get('/:userId/getReviews', async (req, res) => {
  const { userId } = req.params;
  const result = await getReviews(res, userId);
  res.send(result);
});

// Post an order for a user
userRouter.post('/:userId/postOrder', async (req, res) => {
  const { userId } = req.params;
  const { foodId, quantity } = req.body;
  const result = await postOrder(res, userId, foodId, quantity);
  res.send(result);
});

userRouter.get('/:userId/getOrders/:orderId', async (req, res) => {
  const { userId, orderId } = req.params;
  const result = await getOrder(res, userId, orderId);
  res.send(result);
});

export default userRouter;
