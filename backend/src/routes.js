const express = require("express");

const routes = express.Router();

const userController = require("./controllers/userController");
const barberController = require("./controllers/barberController");
const authController = require("./controllers/authController");
const scheduleController = require("./controllers/scheduleController");

const authMiddleware = require("./middlewares/authenticate");

routes.post("/user", userController.store);
routes.post("/user/authenticate", authController.userAuthenticate);

routes.post("/barber", barberController.store);
routes.post("/barber/authenticate", authController.barberAuthenticate);

routes.get("/barber/schedule", barberController.index);

routes.use(authMiddleware);

routes.post("/schedule", scheduleController.store);
routes.delete("/schedule/:sche_id", scheduleController.delete);

module.exports = routes;
