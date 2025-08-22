const express = require("express");
const router = express.Router();
const { postCar, getSingleCar, getAllCars, deleteCar } = require("../controllers/carController");


router.post("/", postCar);
router.get("/", getAllCars);
router.get("/:id", getSingleCar);
router.delete("/:id", deleteCar);

module.exports = router;
