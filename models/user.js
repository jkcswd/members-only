const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {type: String, required: true, maxLength: 100},
    lastName: {type: String, required: true, maxLength: 100},
    userName: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true, minLength:6, maxLength: 100},
    membershipStatus: {type: String, required: true, maxLength: 100}
  }
);

UserSchema.virtual('fullName').get(function () {
  let fullName = '';

  if (this.firstName && this.lastName) {
    fullName = this.lastName + ', ' + this.firstName
  }
  if (!this.firstName || !this.lastName) {
    fullName = '';
  }
  return fullName;
});


module.exports = mongoose.model('User', UserSchema);
