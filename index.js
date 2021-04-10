const express = require('express');
const socketio=require('socket.io');

const http = require('http');
//const cors = require('cors');

const {addUser, removeUser,getUser,getUserInRoom} =require('./users');


const PORT = process.env.PORT||5000;
const router = require('./router');
const { getuid } = require('process');
const app = express();
const server = http.createServer(app);
corsOptions={
    cors:true,
    origins:["http:localhost:3000"],
}
const io = socketio(server,corsOptions);


io.on('connection', (socket)=>{
    socket.on('join',({name,room},callback)=>{
        const {error,user} = addUser({id: socket.id,name,room});
        if(error){
            return callback(error);
        }
        socket.emit('message',{user:'admin',text: `${name,room},welcome to the room ${room}`})
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined!`})
        socket.join(user.room);

        console.log(socket.id,name,room);
        callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message',{user:user.name,text:message});

        callback();

    });

    socket.on('disconnect',()=>{
        console.log('User had left!!!');
    });
})
app.use(router);
server.listen(PORT, ()=>console.log(`Server is running and up ${PORT}`))
