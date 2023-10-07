import express from 'express';
import {
  getLikes,
  getUnlikes,
  getRestaurant,
  getRestaurants,
} from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/', async (req, res) => {
  const result = await getRestaurants();
  res.send(result);
});

// Get a restaurant from db
restaurantRouter.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const result = await getRestaurant(res, restaurantId);
  res.send(result);
});

// Get likes for a restaurant
restaurantRouter.get('/:restaurantId/getRestaurantLikes', async (req, res) => {
  const { restaurantId } = req.params;
  const result = await getLikes(res, restaurantId);
  res.send(result);
});

// Get unlikes for a restaurant
restaurantRouter.get(
  '/:restaurantId/getRestaurantUnlikes',
  async (req, res) => {
    const { restaurantId } = req.params;
    const result = await getUnlikes(res, restaurantId);
    res.send(result);
  },
);

export default restaurantRouter;
