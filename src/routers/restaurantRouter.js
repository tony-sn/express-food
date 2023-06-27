import express from 'express';
import {
  getLikes,
  getUnlikes,
  getLikesAndUnlikes,
  postReview,
  getReviews,
  postOrder,
  getOrder,
  getRestaurant,
  getRestaurants,
} from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

// Get a restaurant from db
restaurantRouter.get('/restaurants/:id/', async (req, res) => {
  const restaurantId = req.params.id;
  const result = await getRestaurant(res, restaurantId);
  res.send(result)
})

restaurantRouter.get('/restaurants', async (req, res) => {
  const result = await getRestaurants();

  res.send(result)
})

// Get likes for a restaurant
restaurantRouter.get('/restaurants/:id/likes', async (req, res) => {
  const restaurantId = req.params.id;
  const result = await getLikes(res, restaurantId);
  res.send(result);
});

// Get unlikes for a restaurant
restaurantRouter.get('/restaurants/:id/unlikes', async (req, res) => {
  const restaurantId = req.params.id;
  const result = await getUnlikes(res, restaurantId);
  res.send(result);
});

// Get likes and unlikes for a user
restaurantRouter.get('/users/:id/likes-unlikes', async (req, res) => {
  const userId = req.params.id;
  const result = await getLikesAndUnlikes(res, userId);
  res.send(result);
});

// Post a review for a restaurant
restaurantRouter.post('/users/:userId/review/:restaurantId', async (req, res) => {
  const { userId, restaurantId } = req.params;
  const review = req.body.review;
  const result = await postReview(res, userId, restaurantId, review);
  res.send(result);
});

// Get reviews for a user
restaurantRouter.get('/users/:id/reviews', async (req, res) => {
  const userId = req.params.id;
  const result = await getReviews(res, userId);
  res.send(result);
});

// Post an order for a user
restaurantRouter.post('/users/:userId/order', async (req, res) => {
  const { userId } = req.params;
  const { foodId, quantity } = req.body;
  const result = await postOrder(res, userId, foodId, quantity);
  res.send(result);
});

restaurantRouter.get('/users/:userId/orders/:orderId', async (req, res) => {
  const { userId, orderId } = req.params;
  const result = await getOrder(res, userId, orderId);
  res.send(result);
})

export default restaurantRouter;
