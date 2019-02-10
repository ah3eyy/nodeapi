const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define collection and schemas for business

let User = new Schema({
  email:{
    type: String
  },
  password:{
    type: String
  }
},{
    collection: 'register'
});

module.exports = mongoose.model('User', User)
