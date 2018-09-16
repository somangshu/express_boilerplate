var Joi = require('joi'),
    util = require('util'),
    _ = require('lodash');

var BadRequestError = function (errors) {
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BadRequestError';
    this.message = 'Bad Request Error';
    this.errors = errors;
};

util.inherits(BadRequestError, Error);

var validate = function (schema) {
    return function (req, res, next) {
        var body = _.extend({}, req.body);
        delete body.access_token; //remove access token for api calls

        Joi.validate(body, schema, {
            abortEarly: false
        }, function (err, schemaResult) {
            if (err) {
                var details = [];
                err.details.forEach(function (d) {
                    details.push({
                        message: d.message,
                        path: d.path
                    });
                });

                return next(new BadRequestError(details));
            }

            req.schema = schemaResult;
            return next();
        });
    }
};

module.exports = {
    validate: validate,
    BadRequestError: BadRequestError
};