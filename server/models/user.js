const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  socketId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  joinedAt: {
  type: String,
  default: () => new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata'
  })
}
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
