const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  startDate: { type: Date, required: true },
  isPending: { type: Boolean, default: true },
  brand: { type: String, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
});

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = Reserve;
