const express = require('express');
const socketio=require('socket.io');
const http = require('http');
//const cors = require('cors');



const PORT = process.env.PORT||5000;

const router = require('./router');
const app = express();
const server = http.createServer(app);
//app.use(cors())
const io = socketio(server);
// const io = require("socket.io")(http, {
//     cors: {
//       origin: "localhost:3000",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });

io.on('connection', (socket)=>{
    console.log('We have a new connection!!!');
    socket.on('disconnect',()=>{
        console.log('User had left!!!');
    });
})
app.use(router);
server.listen(PORT, ()=>console.log(`Server is running and up ${PORT}`))
