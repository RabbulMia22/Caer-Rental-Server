const express = require("express");
const { userInfo, getUserRole } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/", userInfo);
userRouter.get("/", getUserRole);

module.exports = userRouter;