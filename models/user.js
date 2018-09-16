var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
    password: String,
    updated_at: {
        type: Date,
        default: Date.now
    },
    phone: String,
    address: String,
    pic: String,
    lat_long: String,
    username: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
    is_chef: {
        type: Boolean,
        default: 0
    },
    cusine: {
        slug_collection: [{
            type: String
        }],
        name_collection: [{
            type: String
        }]
    },
    dishes: {
        slug_collection: [{
            type: String
        }],
        name_collection: [{
            type: String
        }]
    },
    followers: [{
        type: String
    }],
    following: [{
        type: String
    }]
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        user.password = bcrypt.hashSync(user.password, 10);
        next();
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

module.exports = mongoose.model('User', UserSchema);