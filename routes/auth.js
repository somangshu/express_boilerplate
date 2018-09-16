var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
require('../config/passport')(passport);
var config = require('../config/database')
var jwt = require('jsonwebtoken');
var User = require('../models/user.js');
var ValidationMiddleware = require('../middleware/requestMiddleware.js')
var UserSchema = require('../validations/userValidator.js')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('authorise users for the app. Go to login/register');
});

router.get('/login', function (req, res, next) {
    res.send('nested inside')
});

// router.post('/login', function (req, res, next) {
//     passport.authenticate('local', {
//         session: false
//     }, function (err, data) {
//         if (err) {
//             return next(err)
//         }
//         res.json(data);
//     })(req, res, next);
// });

router.post('/login', function (req, res, next) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
});

router.post('/signup', ValidationMiddleware.validate(UserSchema.create), function (req, res, next) {
    User.create(req.body, function (err, post) {
        if (err) return res.json(err);
        res.json(post);
    });
});

router.get('/test', passport.authenticate('jwt', {
    session: false
}), function (req, res, next) {
    res.json('hello')
});

module.exports = router;