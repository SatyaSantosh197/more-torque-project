const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

// Post Operations
router.post('/org', orgController.createOrganisation);

// Update Operation
router.patch('/org', orgController.updateOrganisation);

// Get operation
router.get('/org', orgController.getOrganisations);

module.exports = router;  
