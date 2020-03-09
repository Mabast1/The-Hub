var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  classnum: {
    type: String,
    required: true,
    trim: true
  },
  classtitle: {
    type: String,
    required: true,
    unique:true,
    trim: true
  },
  o_titleimg: {
    type: String,
  },
  o_text: {
    type: String,
  },
  o_finalimg: {
    type: String,
  },
  m_student: {
    type: Array,
  },
  m_teacher: {
    type: Array,
  },
  m_group: {
    type: Array,
  },
  m_equip: {
    type: Array,
  },
  p_prep: {
    type: Array,
  },
  p_special: {
    type: Array,
  },
  e_question: {
    type: Array,
  },
  e_wtk: {
    type: Array,  
  },
  k_ican: {
    type: Array,  
  },
  k_engage: {
    type: Array,  
  },
  ffacts: {
    type: Array,  
  },
  steps: {
    type: Array,  
  },

  

});




var Class = mongoose.model('Class', ClassSchema);
module.exports = Class;
