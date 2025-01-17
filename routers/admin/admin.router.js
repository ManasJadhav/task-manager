const { Router } = require("express");
const {
  createNewAdmin,
  loginAdmin,
  logoutAdmin,
  createNewManager,
  createNewClient,
  getAdminProfile,
} = require("../../controller/admin.controller");
const { requireAdminAuth } = require("../../middleware/adminAuth.middleware");

const adminRouter = Router();

adminRouter.post("/addAdmin", requireAdminAuth, createNewAdmin);
adminRouter.post("/addManager", requireAdminAuth, createNewManager);
adminRouter.post("/addClient", requireAdminAuth, createNewClient);
adminRouter.get("/profile", requireAdminAuth, getAdminProfile);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/logout", logoutAdmin);

module.exports = adminRouter;
