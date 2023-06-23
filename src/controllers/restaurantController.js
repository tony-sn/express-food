import { Sequelize } from 'sequelize'
import initModels from '../models/init-models.js'

import sequelize from '../models/index.js'

import { error, failCode, successCode } from '../config/response.js'

const models = initModels(sequelize)

// const Op = Sequelize.Op

// Get the likes for a restaurant
const getLikes = async (restaurantId) => {
  try {
    const likes = await models.like_res.findAll({
      where: { res_id: restaurantId },
      include: [{ model: models.user, as: 'user' }],
    });
    return successCode(likes);
  } catch (err) {
    return error(err.message);
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

// Get the unlikes for a restaurant
const getUnlikes = async (restaurantId) => {
  try {
    const unlikes = await models.rate_res.findAll({
      where: { res_id: restaurantId },
      include: [{ model: models.user, as: 'user' }],
    });
    return successCode(unlikes);
  } catch (err) {
    return error(err.message);
  }
};

// Get the likes and unlikes for a user
const getLikesAndUnlikes = async (userId) => {
  try {
    const likes = await models.like_res.findAll({
      where: { user_id: userId },
      include: [{ model: models.restaurant, as: 're' }],
    });

    const unlikes = await models.rate_res.findAll({
      where: { user_id: userId },
      include: [{ model: models.restaurant, as: 're' }],
    });

    return successCode({ likes, unlikes });
  } catch (err) {
    return error(err.message);
  }
};

// Post a review for a restaurant
const postReview = async (userId, restaurantId, review) => {
  try {
    const newReview = await models.rate_res.create({
      user_id: userId,
      res_id: restaurantId,
      review,
    });

    return successCode(newReview);
  } catch (err) {
    return error(err.message);
  }
};

// Get the reviews for a user
const getReviews = async (userId) => {
  try {
    const reviews = await models.rate_res.findAll({
      where: { user_id: userId },
      include: [{ model: models.restaurant, as: 're' }],
    });

    return successCode(reviews);
  } catch (err) {
    return error(err.message);
  }
};

// Post an order for a user
const postOrder = async (userId, foodId, quantity) => {
  try {
    const newOrder = await models.tbl_order.create({
      user_id: userId,
      food_id: foodId,
      quantity,
    });

    return successCode(newOrder);
  } catch (err) {
    return error(err.message);
  }
};

export { getLikes, getUnlikes, getLikesAndUnlikes, postReview, getReviews, postOrder, getRestaurant };
