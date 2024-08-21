const Vehicle = require('../models/Vehicles');
const Organisation = require('../models/Organisation');
const decodeVin = require('../utils/vinDecoder');
const axios = require('axios');

exports.createVehicle = async (req, res) => {
  try {
    const { vin, org } = req.body;
    
    // If no organisation exits return error message(in case of invalid input)
    const organisation = await Organisation.findById(org);
    if (!organisation) {
      return res.status(400).json({ error: 'Organisation not found' });
    }

    const decodedData = await decodeVin(vin);

    // Add the entry to Db
    const newVehicle = new Vehicle({
      vin,
      manufacturer: decodedData.manufacturer,
      model: decodedData.model,
      year: decodedData.year,
      org: organisation._id
    });
    newVehicle.save();

    // 201 - created vehicle detils
    res.status(201).json(newVehicle);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getVehicleByVin = async (req, res) => {
  try {
    const { vin } = req.params;

    // Find weather the vin is present in the Db
    const vehicle = await Vehicle.findOne({ vin });

    if (!vehicle) {
      return res.status(404).json({ 
        message: 'Vehicle not found' 
      });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.decodeVin = async (req, res) => {
  try {
    const decodedData = await decodeVin(vin);

    const newVehicle = new Vehicle({
      vin,
      manufacturer: decodedData.manufacturer,
      model: decodedData.model,
      year: decodedData.year,
      org: organisation._id
    });
    newVehicle.save();

    // 201 - created vehicle detils
    res.status(201).json(newVehicle);
  } catch(err) {
    res.status(500).json({error: err.messsage});
  }
};


exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find(); // Fetch all vehicles from the database
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This is the function to validate weather the Vin is a 17 digit alpha-numeric string, 
// as the API call not in such format im not using it.

function validateVin(vin) {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

  if (vinRegex.test(vin)) {
    return true;
  } 
  return false;
}

