const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const vehicleVinDecode = require('../utils/vinDecoder');

// Post operations
router.post('/vehicle', vehicleController.createVehicle); 

// Get operations
router.get('/vehicle/:vin', vehicleController.getVehicleByVin);
router.get('vehicle/decode/:vin', vehicleController.decodeVin);
module.exports = router;
