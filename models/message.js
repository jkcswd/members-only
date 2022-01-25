const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 100},
    message: {type: String, required: true, maxLength: 500},
    date: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  }
);

module.exports = mongoose.model('Message', MessageSchema);