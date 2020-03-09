var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  ppic: {
    type: String,
    unique: false,
    trim: true
  },
  city: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  state: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  country: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  achievement: {
    type: Array,
    required: false,
    default: [0,1,"Beginner"]
  },
  achieved: {
    type: Array,
    require: false,
    
  }
  

});

//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
