const express = require('express');
const vehicleRoutes = require('./routes/vehicleRoutes');
const orgRoutes = require('./routes/orgRoutes');
const portNumber = 4747;
const size = 5;

const app = express();
// connection to Db
const connectDB = require('./config/db');
connectDB();
app.use(express.json());


app.use('/', vehicleRoutes); 
app.use('/', orgRoutes);

app.listen(portNumber, () => console.log(`http://localhost:${portNumber}`));
