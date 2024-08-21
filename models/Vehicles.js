const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vin: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Org',
    required: true
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
