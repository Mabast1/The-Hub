var mongoose = require('mongoose');

var MarketSchema = new mongoose.Schema({
  email: {
    type: String,
    unique:true,
    required: false,
    trim: true
  },
  permission: {
    type: Boolean,
    required: false,
    trim: true
  }
  

});




var Market = mongoose.model('Market', MarketSchema);
module.exports = Market;
