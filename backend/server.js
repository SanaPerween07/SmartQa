require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const http = require('http'); // Part of core node api/module which enables creating server.
const { Server } = require('socket.io');

const roomRoutes = require('./src/routes/roomRoutes');

const app = express();         // create an instance of express to set up the server

// Middleware
app.use(express.json());  

const corsOptions = {
  origin: process.env.CLIENT_URL,  
  credentials: true,
}

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "DELETE", "PUT"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connection: ", socket.id);

    socket.on("join-room", (roomCode) => {
        socket.join(roomCode);
        console.log(`User joined room: ${roomCode}`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected: ", socket.id);
    });
});

app.set("io", io);

app.use('/room', roomRoutes);  

// Start the server
const PORT = process.env.PORT;
server.listen(PORT, (error) => {
  if (error) {
    console.error('Server failed to start due to:', error);
  } 
  else {
    console.log(`Server is running on port ${PORT}`);
  }
});