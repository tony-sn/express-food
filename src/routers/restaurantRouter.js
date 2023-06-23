import express from 'express';
import {
  getLikes,
  getUnlikes,
  getLikesAndUnlikes,
  postReview,
  getReviews,
  postOrder,
  getRestaurant,
} from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

// Get a restaurant from db
restaurantRouter.get('/restaurant/:id', async (req, res) => {
  const restaurantId = req.params.id;
  const result = await getRestaurant(restaurantId);
  res.send(result)
})

// Get likes for a restaurant
restaurantRouter.get('/restaurant/:id/likes', async (req, res) => {
  const restaurantId = req.params.id;
  const result = await getLikes(restaurantId);
  res.send(result);
});

// Get unlikes for a restaurant
restaurantRouter.get('/restaurant/:id/unlikes', async (req, res) => {
  const restaurantId = req.params.id;
  const result = await getUnlikes(restaurantId);
  res.send(result);
});

// Get likes and unlikes for a user
restaurantRouter.get('/user/:id/likes-unlikes', async (req, res) => {
  const userId = req.params.id;
  const result = await getLikesAndUnlikes(userId);
  res.send(result);
});

// Post a review for a restaurant
restaurantRouter.post('/user/:userId/review/:restaurantId', async (req, res) => {
  const { userId, restaurantId } = req.params;
  const review = req.body.review;
  const result = await postReview(userId, restaurantId, review);
  res.send(result);
});

// Get reviews for a user
restaurantRouter.get('/user/:id/reviews', async (req, res) => {
  const userId = req.params.id;
  const result = await getReviews(userId);
  res.send(result);
});

// Post an order for a user
restaurantRouter.post('/user/:userId/order', async (req, res) => {
  const { userId } = req.params;
  const { foodId, quantity } = req.body;
  const result = await postOrder(userId, foodId, quantity);
  res.send(result);
});

export default restaurantRouter;
