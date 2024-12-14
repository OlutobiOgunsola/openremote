/**
 * Class User Controller
 */

const { RESPONSE_CODES, RESPONSE } = require("../lib/settings");
const UserService = require("../services/user.service");

class UserController {
    constructor() {
        this.findUserController = (req, res) => {
            const identifier = req.params.identifier;

            if (!identifier) {
                return res.status(RESPONSE_CODES.BAD_REQUEST).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.BAD_REQUEST,
                    data: "You must get user with identifier"
                });
            }

            try {
                let user = UserService.findUser(identifier);
                if (!user) {
                    return res.status(RESPONSE_CODES.NOT_FOUND).json({
                        ...RESPONSE.FAILURE,
                        code: RESPONSE_CODES.NOT_FOUND,
                        data: "User with passed identifier not found"
                    });
                }
                return res.status(RESPONSE_CODES.SUCCESS).json({ ...RESPONSE.SUCCESS, data: user });
            } catch (e) {
                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e
                });
            }
        };

        this.findUsersController = (req, res) => {
            try {
                let users = UserService.getUsers();
                const filteredUsers = users.filter(user => (user.id !== req.user.id));
                return res.status(RESPONSE_CODES.SUCCESS).json({ ...RESPONSE.SUCCESS, data: filteredUsers });
            } catch (e) {

                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e
                });
            }
        };

        this.findSidebarUsersController = (req, res) => {
            try {
                let users = UserService.getUsers();
                let filteredUsers = users.filter(user => (user.email !== req.user.email));
                return res.status(RESPONSE_CODES.SUCCESS).json({ ...RESPONSE.SUCCESS, data: filteredUsers });
            } catch (e) {

                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e
                });
            }
        };
    }
}

module.exports = UserController;