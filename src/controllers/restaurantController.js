import initModels from '../models/init-models.js';

import sequelize from '../models/index.js';

import { error, failCode, successCode } from '../config/response.js';

const models = initModels(sequelize);

// Get the likes for a restaurant
const getLikes = async (res, restaurantId) => {
  try {
    const likes = await models.like_res.findAll({
      where: { res_id: restaurantId },
      include: [{ model: models.user, as: 'user' }],
    });
    return successCode(res, likes);
  } catch (err) {
    return error(res, err.message);
  }
};

const getRestaurant = async (res, restaurantId) => {
  try {
    const restaurant = await models.restaurant.findOne({
      where: { res_id: restaurantId },
    });

    return successCode(res, restaurant);
  } catch (err) {
    return error(res, err.message);
  }
};

const getRestaurants = async (res, req) => {
  try {
    const restaurants = await models.restaurant.findAll();
    return restaurants;
  } catch (err) {
    return error(res, err.message);
  }
};

// Get the unlikes for a restaurant
const getUnlikes = async (res, restaurantId) => {
  try {
    const unlikes = await models.rate_res.findAll({
      where: { res_id: restaurantId },
      include: [{ model: models.user, as: 'user' }],
    });
    return successCode(res, unlikes);
  } catch (err) {
    return error(res, err.message);
  }
};
export { getLikes, getUnlikes, getRestaurant, getRestaurants };
