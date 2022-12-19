const { Router } = require("express");
const {
  loginClient,
  logoutClient,
  getClientProfile,
  createTask,
} = require("../../controller/client.controller");
const { requireClientAuth } = require("../../middleware/clientAuth.middleware");

const clientRouter = Router();

clientRouter.get("/profile", requireClientAuth, getClientProfile);
clientRouter.post("/login", loginClient);
clientRouter.get("/logout", logoutClient);
clientRouter.post("/createTask", requireClientAuth, createTask);

module.exports = clientRouter;
