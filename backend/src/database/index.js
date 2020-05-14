const Sequelize = require("sequelize");

const dbConfig = require("../config/database");

const User = require("../models/User");
const Schedule = require("../models/Schedule");

const connection = new Sequelize(dbConfig);

User.init(connection);
Schedule.init(connection);

User.associate(connection.models);
Schedule.associate(connection.models);

module.exports = connection;
