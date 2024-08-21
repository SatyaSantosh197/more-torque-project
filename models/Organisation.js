const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    account: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    fuelReimbursementPolicy: {
      type: String,
      default: '1000'
    },
    speedLimitPolicy: {
      type: String,
      default: 'defaultPolicy'
    },
    parentOrg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Org',
      default: null
    },
  });
  
  const Organisation = mongoose.model('Org', orgSchema);
  
  module.exports = Organisation;
  