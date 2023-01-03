const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET_KEY } = require('../utils/secrets');

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(StatusCodes.UNAUTHORIZED).json({error: 'You are not authorized to perform this operation!'});
            } else {
                User.query({
                    where: {id: decoded.id},
                    select: ['email', 'id']
                }).fetch().then(user => {
                    if (!user) {
                        res.status(StatusCodes.NOT_FOUND).json({error: 'No such user'});
                    } else {
                        req.currentUser = user;
                        next();
                    }

                });
            }
        });
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            error: 'No token provided'
        });
    }
};