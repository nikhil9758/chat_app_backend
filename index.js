const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = socketIO(server,{
    cors:{
        origin: '*',
        methods:['GET','POSt']
    }
});

app.get('/', (req, res) => {
  res.send('Server is running.');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for incoming messages from clients
  socket.on('sendMessage', (message) => {
    // Emit the message to all connected clients
    io.emit('message', { user: socket.id, text: message });
  });

  // Disconnect handling
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
