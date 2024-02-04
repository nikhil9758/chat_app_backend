const express=require('express')
const http= require('http')
const env= require("dotenv")
const app= express()
const cors=require('cors')
const port= process.env.PORT||5000
const server=http.createServer(app)
const socketio=require('socket.io')
const io=socketio(server)
app.use(cors())
// console.log(io)
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
  
  app.get('/', (req, res) => {
    res.send('Server is running.');
  });
  

app.listen(port,()=>{
 console.log("server is listening on port",port)
})