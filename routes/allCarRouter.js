const express = require("express");
const router = express.Router();
const { postCar, getSingleCar, getAllCars, deleteCar, liveLocation } = require("../controllers/carController");


router.post("/", postCar);
router.get("/", getAllCars);
router.get("/:id", getSingleCar);
router.delete("/:id", deleteCar);
router.get("/:id", liveLocation);

module.exports = router;
