const express = require("express");
const {  } = require("../controllers/userController");
const { createAdmin, getAdminRole } = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/", createAdmin);
adminRouter.get("/", getAdminRole);

module.exports = adminRouter;