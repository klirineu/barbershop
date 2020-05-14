const express = require("express");

const routes = express.Router();

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const scheduleController = require("./controllers/scheduleController");

const authMiddleware = require("./middlewares/authenticate");

routes.post("/user", userController.store);
routes.post("/user/authenticate", authController.authenticate);

routes.use(authMiddleware);

routes.get("/schedule", scheduleController.index);
routes.post("/schedule", scheduleController.store);
routes.delete("/schedule/:sche_id", scheduleController.delete);

module.exports = routes;
