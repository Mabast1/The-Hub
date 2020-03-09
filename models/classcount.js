var mongoose = require('mongoose');

var ClassCountSchema = new mongoose.Schema({
  cogname: {
    type: String,
    unique:true,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
  

});




var Count = mongoose.model('Count', ClassCountSchema);
module.exports = Count;
