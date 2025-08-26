const express = require("express");
const { userInfo, getUserRole, getAdmin } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/", userInfo);
userRouter.get("/", getUserRole);
userRouter.get("/", getAdmin);

module.exports = userRouter;