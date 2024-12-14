const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { RESPONSE_CODES, RESPONSE } = require("../lib/settings");
const UserService = require("../services/user.service");


dotenv.config();
/**
 * Validates a JWT token and signs user into the request object
 * @param {*} req 
 * @param {*} res 
 */
const ValidateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(RESPONSE_CODES.UNAUTHENTICATED).json({
            ...RESPONSE.FAILURE,
            code: RESPONSE_CODES.UNAUTHENTICATED,
            data: "JWT Token is not provided"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
                ...RESPONSE.FAILURE,
                code: RESPONSE_CODES.UNAUTHORIZED,
                data: "JWT Token is not valid"
            });
        }

        // get the appropriate user
        let userObject = UserService.findUserIncToken(user.email);
        if (userObject.jwt !== token) {
            return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
                ...RESPONSE.FAILURE,
                code: RESPONSE_CODES.UNAUTHORIZED,
                data: "JWT Token does not belong to user"
            });
        }
        req.user = userObject;
        next();
    });
};

module.exports = ValidateToken;