import { Sequelize } from 'sequelize'
import initModels from '../models/init-models.js'

import sequelize from '../models/index.js'

import { error, failCode, successCode } from '../config/response.js'

const models = initModels(sequelize)

// const Op = Sequelize.Op

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
      where: { res_id: restaurantId }
    })

    return successCode(res, restaurant)

  }
  catch (err) {
    return error(res, err.message)
  }
}

const getRestaurants = async (res, req) => {
  try {
    const restaurants = await models.restaurant.findAll()

    return restaurants

  } catch (err) {
    return error(res, err.message)
  }
}

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

// Get the likes and unlikes for a user
const getLikesAndUnlikes = async (res, userId) => {
  try {
    const likes = await models.like_res.findAll({
      where: { user_id: userId },
      include: [{ model: models.restaurant, as: 're' }],
    });

    const unlikes = await models.rate_res.findAll({
      where: { user_id: userId },
      include: [{ model: models.restaurant, as: 're' }],
    });

    return successCode(res, { likes, unlikes });
  } catch (err) {
    return error(res, err.message);
  }
};

// Post a review for a restaurant
const postReview = async (res, userId, restaurantId, review) => {
  try {
    const newReview = await models.rate_res.create({
      user_id: userId,
      res_id: restaurantId,
      review,
    });

    return successCode(res, newReview);
  } catch (err) {
    return error(res, err.message);
  }
};

// Get the reviews for a user
const getReviews = async (res, userId) => {
  try {
    const reviews = await models.rate_res.findAll({
      where: { user_id: userId },
      include: [{ model: models.restaurant, as: 're' }],
    });

    return successCode(res, reviews);
  } catch (err) {
    return error(res, err.message);
  }
};

// Post an order for a user
const postOrder = async (res, userId, foodId, quantity) => {
  try {
    const newOrder = await models.tbl_order.create({
      user_id: userId,
      food_id: foodId,
      quantity,
    });

    return successCode(res, newOrder);
  } catch (err) {
    return error(err.message);
  }
};

const getOrder = async (res, userId, orderId) => {
  try {
    const order = await models.tbl_order.findOne({
      where: { user_id: userId, order_id: orderId },
    })

    return successCode(res, order)

  } catch (err) {
    return error(res, err.message)
  }
}

export { getLikes, getUnlikes, getLikesAndUnlikes, postReview, getReviews, getOrder, postOrder, getRestaurant, getRestaurants };
