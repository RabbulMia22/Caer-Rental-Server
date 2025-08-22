const express = require("express");
const { postReserve, getReserves, getAllReserves, updateReserve } = require("../controllers/reserverController");
const reserveRouter = express.Router();

reserveRouter.post("/", postReserve);
reserveRouter.get("/", getReserves);
reserveRouter.get("/", getAllReserves);
reserveRouter.patch("/:id", updateReserve);

module.exports = reserveRouter;