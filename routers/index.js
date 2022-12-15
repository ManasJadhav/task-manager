const { Router } = require("express");
const db = require("../database/db");
const adminRouter = require("./admin/admin.router");

const router = Router();

router.use("/admin", adminRouter);

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Welcome to backend of Task Manager.",
  });
});

module.exports = router;
