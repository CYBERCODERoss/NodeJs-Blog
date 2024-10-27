const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum length for password
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/ // Basic email validation
  }
});

module.exports = mongoose.model('User', UserSchema);