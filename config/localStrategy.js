var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, {
                    data: {},
                    message: 'Incorrect username',
                    errorCode: 404
                });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, {
                    data: {},
                    message: 'Incorrect password',
                    errorCode: 401
                });
            }
            var name = user.name;
            return done(null, {
                data: {
                    name
                },
                message: 'Authenticated'
            });
        });
    }
));