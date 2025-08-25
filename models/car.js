const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  image: { type: String },
  type: { type: String },
  seat: { type: Number },
  fuel: { type: String },
  rentalStartTime: { type: Date }, 
  rentalEndTime: { type: Date },   
  pickupLocation: { 
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  dropoffLocation: { 
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  isRented: { type: Boolean, default: false },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
