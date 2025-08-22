const Car = require("../models/car");

const postCar = async (req, res) => {
  try {
    const newCar = new Car({
       ...req.body 
      });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating car", error });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cars", error });
  }
};

const getSingleCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching car", error });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting car", error });
  }
};

module.exports = { postCar, getAllCars, getSingleCar, deleteCar };
