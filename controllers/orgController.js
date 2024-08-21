const Organisation = require('../models/Organisation');

exports.createOrganisation = async (req, res) => {
  try {
    const { name, account, website, fuelReimbursementPolicy, speedLimitPolicy, parentOrg } = req.body;
    
    // Create and save organization
    const newOrg = new Organisation({
      name,
      account,
      website,
      fuelReimbursementPolicy,
      speedLimitPolicy,
      parentOrg
    });
    
    newOrg.save();
    res.status(201).json(newOrg);
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOrganisation = async (req, res) => {
  try {
    const { id, account, website, fuelReimbursementPolicy, speedLimitPolicy, parentOrg, childrenOrgs } = req.body;
    
    const updatedOrg = await Organisation.findByIdAndUpdate(
        id,
        {
          account,
          website,
          parentOrg,
          speedLimitPolicy,          
          ...(parentOrg == null && { fuelReimbursementPolicy })
        },
        { new: true }
      );
      
    if (!updatedOrg) {
      return res.status(404).json({ message: 'No Org Organisation found' });
    }
    res.status(200).json(updatedOrg);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.find();

    if (!organisations) {
      return res.status(400).json({ message: 'No organizations found' });
    }

    res.status(200).json(organisations);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};