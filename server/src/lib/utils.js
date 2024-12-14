const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

/**
 * Signs a JWT
 * @param {*} user The user object to be signed
 * @param {*} expiresIn The JWT expiration time
 * @returns Signed JWT
 */
module.exports.SignJWT = (user, expiresIn) => {
    return jwt.sign({
        email: user.email,
        id: user.id
    }, process.env.JWT_SECRET, { expiresIn });
};