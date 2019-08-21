"use strict";
// =================================================================
// get the necessary packages ======================================
// =================================================================
var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

// =================================================================
// define schema ===================================================
// =================================================================
// Permission of 0 => regular user
// Permission of 1 => Administrative user
// Permission of 2 => Super Administrative user

var UserSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        requires: true
    },

    gender: {
        type: String,
        requires: true
    },

    surgerytype: {
        type: String,
        requires: true
    },

    surgerydate: {
        type: Date,
        requires: true
    },

    email: {
        type: String,
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    createdate: {
        type: Date,
        default: Date.now
    },

    registrationdate: {
        type: Number,
        default: 0
    },

    trialstartdate: {
        type: Number,
        default: 0
    },

    PT: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PT'
    },

    progress: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Progress'
        },
        pack_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pack'
        }
    }],

  messages: [{
      from: {
          type: String,
          require: true
      },
      sentdatetime: {
          type: Number,
          require: true
      },
      subject: {
          type: String
      },
      msg: {
          type: String,
          require: true
      }
  }]

}, {
    toObject: {
        virtuals: true
    }, toJSON: {
        virtuals: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('PA', UserSchema);
