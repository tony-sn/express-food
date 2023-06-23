import { Sequelize } from "sequelize"

import config from "../config/config.js"

const { database, host, password, user, port, dialect } = config;

let sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  port
})

export default sequelize
