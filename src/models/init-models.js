import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _SequelizeMeta from  "./SequelizeMeta.js";
import _Users from  "./Users.js";
import _food from  "./food.js";
import _food_type from  "./food_type.js";
import _like_res from  "./like_res.js";
import _rate_res from  "./rate_res.js";
import _restaurant from  "./restaurant.js";
import _sub_food from  "./sub_food.js";
import _tbl_order from  "./tbl_order.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const SequelizeMeta = _SequelizeMeta.init(sequelize, DataTypes);
  const Users = _Users.init(sequelize, DataTypes);
  const food = _food.init(sequelize, DataTypes);
  const food_type = _food_type.init(sequelize, DataTypes);
  const like_res = _like_res.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);
  const tbl_order = _tbl_order.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  sub_food.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id"});
  tbl_order.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(tbl_order, { as: "tbl_orders", foreignKey: "food_id"});
  food.belongsTo(food_type, { as: "type", foreignKey: "type_id"});
  food_type.hasMany(food, { as: "foods", foreignKey: "type_id"});
  like_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(like_res, { as: "like_res", foreignKey: "res_id"});
  rate_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id"});
  like_res.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasOne(like_res, { as: "like_re", foreignKey: "user_id"});
  rate_res.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasOne(rate_res, { as: "rate_re", foreignKey: "user_id"});
  tbl_order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(tbl_order, { as: "tbl_orders", foreignKey: "user_id"});

  return {
    SequelizeMeta,
    Users,
    food,
    food_type,
    like_res,
    rate_res,
    restaurant,
    sub_food,
    tbl_order,
    user,
  };
}
