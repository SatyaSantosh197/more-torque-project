const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/more-torque');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectDB;
