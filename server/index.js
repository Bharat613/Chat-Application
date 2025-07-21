// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');
// const cors = require('cors');
// require('dotenv').config();  // Load environment variables

// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
// const router = require('./router');

// const app = express();
// const server = http.createServer(app);

// // Read environment variables
// const PORT = process.env.PORT || 5000;
// const CLIENT_ORIGINS = process.env.CLIENT_ORIGIN?.split(",") || ["http://localhost:3000"];

// // Apply CORS middleware for Express
// app.use(cors());
// app.use(router);

// // Configure Socket.IO with CORS
// const io = socketio(server, {
//   cors: {
//     origin: CLIENT_ORIGINS,
//     methods: ["GET", "POST"]
//   }
// });

// // Socket.IO logic
// io.on('connect', (socket) => {
//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if (error) return callback(error);

//     socket.join(user.room);

//     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
//     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     if (user) {
//       io.to(user.room).emit('message', { user: user.name, text: message });
//     }

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if (user) {
//       io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//     }
//   });
// });

// server.listen(PORT, () => console.log(`Server started on port ${PORT}`));



const RoomMessageModel = require('./models/roomMessage'); // Import the message model

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const UserModel = require('./models/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*', // or your frontend URL
    methods: ['GET', 'POST']
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

io.on('connect', (socket) => {

  console.log("New connection:", socket.id);

  socket.on('join', async ({ name, room }, callback) => {
  try {
    const { error, user } = await addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}.`
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined!`
    });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    if (callback) callback();

  } catch (err) {
    console.error("❌ Error in join handler:", err);
    callback("Internal server error");
  }
});


  // socket.on('sendMessage', (message, callback) => {
  //   const user = getUser(socket.id);
  //   if (user) {
  //     io.to(user.room).emit('message', { user: user.name, text: message });
  //   }
  //   if (callback) callback();
  // });
  socket.on('sendMessage', async (message, callback) => {
  const user = getUser(socket.id);

  if (user) {
    // 1. Emit the message to all users in the room
    io.to(user.room).emit('message', { user: user.name, text: message });

    try {
      // 2. Save the message to the RoomMessage collection (grouped by room)
      await RoomMessageModel.findOneAndUpdate(
        { room: user.room },
        {
          $push: {
            messages: {
              senderName: user.name,
              message: message,
              sentAt: new Date()
            }
          }
        },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error('❌ Error saving message to DB:', err);
    }
  }

  if (callback) callback();
});

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`
      });

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

app.get('/',(req,res)=>res.send('api working'))

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
