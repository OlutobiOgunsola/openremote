/**
 * Class - Authentication Controller
 */

const { RESPONSE_CODES, RESPONSE_STATUS, RESPONSE } = require("../lib/settings");
const UserCollection = require("../models/user.model");
const UserService = require("../services/user.service");

class AuthController {
    constructor() {
        this.signupController = (req, res) => {
            let user = req.body;
            if (!user) {
                res.status(RESPONSE_CODES.BAD_REQUEST).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.BAD_REQUEST,
                    data: "User object must be passed to create a user"
                });
            }

            try {
                let userObject = UserService.addUser(user);
                return res.status(RESPONSE_CODES.SUCCESS).json({
                    ...RESPONSE.SUCCESS,
                    data: userObject
                });
            } catch (e) {
                console.log(e);
                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e
                });
            }
        };

        this.signinController = (req, res) => {
            let email = req.params.email;
            console.log(email);
            if (!email) {
                res.status(RESPONSE_CODES.BAD_REQUEST).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.BAD_REQUEST,
                    data: "You must signin with email alone"
                });
            }

            try {
                let user = UserService.findUser(email.toLowerCase());
                if (!user) {
                    return res.status(RESPONSE_CODES.NOT_FOUND).json({
                        ...RESPONSE.FAILURE,
                        code: RESPONSE_CODES.NOT_FOUND,
                        data: "User with passed email not found"
                    });
                }

                // sign a new JWT for the user and return the user object
                let signedUser = UserCollection.signJWT(email);
                return res.status(RESPONSE_CODES.SUCCESS).json({ ...RESPONSE.SUCCESS, data: signedUser });
            } catch (e) {
                console.log(e);
                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e
                });
            }
        };
    }
}

module.exports = AuthController;