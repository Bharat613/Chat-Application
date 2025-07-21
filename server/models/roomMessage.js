const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderName: String,
  message: String,
  sentAt: {
  type: String,
  default: () => new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata'
  })
}

});

const roomMessageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema]
});

const RoomMessageModel = mongoose.model('RoomMessage', roomMessageSchema);
module.exports = RoomMessageModel;
