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
router.get('/', passport.authenticate('jwt', {
    session: false
}), function (req, res, next) {
    res.send('authorise users for the app. Go to login/register');
});

module.exports = router;