require('dotenv').config();

const express = require('express');
const cors = require('cors');

const roomRoutes = require('./src/routes/roomRoutes');

const app = express();         // create an instance of express to set up the server

// Miiddleware
app.use(express.json());  

const corsOptions = {
  origin: process.env.CLIENT_URL,  
  credentials: true,
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/room', roomRoutes);  

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error('Server failed to start due to:', error);
  } 
  else {
    console.log(`Server is running on port ${PORT}`);
  }
});